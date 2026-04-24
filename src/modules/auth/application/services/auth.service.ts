import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { LoginRequestDto } from "../../presentation/dto/requests/login-request";
import { LoginResponseDto } from "../../presentation/dto/responses/login-response";
import { IAuthRepository } from "../../domain/contracts/interfaces/auth.repository.interface";
import { IAuthService } from "../../domain/contracts/interfaces/auth.service.interface";
import { CreateSessionData } from "../../domain/contracts/data/create-session.data";
import { IPasswordHasher } from "../../domain/contracts/interfaces/password-hasher.interface";
import { IAuthTokenService } from "../../domain/contracts/interfaces/auth-token.interface";
import {
  AUTH_TOKEN_SERVICE_TOKEN,
  PASSWORD_HASHER_TOKEN,
} from "../../auth.tokens";
import { IUsersService } from "src/modules/users/domain/contracts/interfaces/users.service.interface";
import { USERS_SERVICE_TOKEN } from "src/modules/users/users.tokens";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IAuthRepository")
    private readonly authRepository: IAuthRepository,
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: IUsersService,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(AUTH_TOKEN_SERVICE_TOKEN)
    private readonly authTokenService: IAuthTokenService,
  ) {}

  async login(
    dto: LoginRequestDto,
    ipAddress: string,
    userAgent: string,
  ): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const refreshTokenHash = await this.passwordHasher.hash(randomUUID());
    const createSessionData: CreateSessionData = {
      userId: user.id,
      refreshTokenHash,
      userAgent: userAgent || null,
      ipAddress: ipAddress || null,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    };

    const session = await this.authRepository.createSession(createSessionData);

    await this.authRepository.createAuditLog({
      userId: session.userId,
      action: "LOGIN",
      entity: "Session",
      entityId: session.id,
      description: "User login (MVP mock)",
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
    });

    return {
      accessToken: this.authTokenService.signAccessToken({
        id: user.id,
        email: user.email,
      }),
      sessionId: session.id,
    };
  }

  async logout(sessionId: number): Promise<void> {
    await this.authRepository.invalidateSession(sessionId);

    await this.authRepository.createAuditLog({
      action: "LOGOUT",
      entity: "Session",
      entityId: sessionId,
      description: "User logout",
    });
  }
}
