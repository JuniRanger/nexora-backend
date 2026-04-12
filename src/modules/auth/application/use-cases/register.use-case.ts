import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { IAuthTokenService } from '../interfaces/auth-token.interface';
import type { IPasswordHasher } from '../interfaces/password-hasher.interface';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import {
  AUTH_TOKEN_SERVICE_TOKEN,
  PASSWORD_HASHER_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../auth.tokens';

export type RegisterInput = {
  email: string;
  password: string;
};

export type RegisterOutput = {
  access_token: string;
};

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(AUTH_TOKEN_SERVICE_TOKEN)
    private readonly authTokenService: IAuthTokenService,
  ) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const user = await this.userRepository.create({
      email: input.email,
      passwordHash,
    });

    const access_token = this.authTokenService.signAccessToken({
      sub: user.id,
      email: user.email,
    });

    return { access_token };
  }
}
