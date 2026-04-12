import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IAuthTokenService } from '../interfaces/auth-token.interface';
import type { IPasswordHasher } from '../interfaces/password-hasher.interface';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import {
  AUTH_TOKEN_SERVICE_TOKEN,
  PASSWORD_HASHER_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../auth.tokens';

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  access_token: string;
};

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(AUTH_TOKEN_SERVICE_TOKEN)
    private readonly authTokenService: IAuthTokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await this.passwordHasher.compare(
      input.password,
      user.password,
    );
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.authTokenService.signAccessToken({
      sub: user.id,
      email: user.email,
    });

    return { access_token };
  }
}
