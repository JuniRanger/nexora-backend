import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenSubject,
  IAuthTokenService,
} from '../../domain/contracts/interfaces/auth-token.interface';

@Injectable()
export class JwtAuthTokenService implements IAuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(user: AuthTokenSubject): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }
}
