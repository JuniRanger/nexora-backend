import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AUTH_TOKEN_SERVICE_TOKEN, PASSWORD_HASHER_TOKEN } from './auth.tokens';
import { BcryptPasswordHasherService } from './infrastructure/services/bcrypt-password-hasher.service';
import { JwtAuthTokenService } from './infrastructure/services/jwt-auth-token.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
    {
      provide: PASSWORD_HASHER_TOKEN,
      useClass: BcryptPasswordHasherService,
    },
    {
      provide: AUTH_TOKEN_SERVICE_TOKEN,
      useClass: JwtAuthTokenService,
    },
  ],
})
export class AuthModule {}
