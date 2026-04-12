import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import {
  AUTH_TOKEN_SERVICE_TOKEN,
  PASSWORD_HASHER_TOKEN,
  USER_REPOSITORY_TOKEN,
} from './auth.tokens';
import { JwtAuthTokenService } from './infrastructure/services/jwt-auth-token.service';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'nexora-dev-jwt-secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: PASSWORD_HASHER_TOKEN,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: AUTH_TOKEN_SERVICE_TOKEN,
      useClass: JwtAuthTokenService,
    },
  ],
})
export class AuthModule {}
