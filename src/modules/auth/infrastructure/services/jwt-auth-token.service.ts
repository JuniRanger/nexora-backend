import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type {
  AccessTokenPayload,
  IAuthTokenService,
} from '../../application/interfaces/auth-token.interface';

@Injectable()
export class JwtAuthTokenService implements IAuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload);
  }
}
