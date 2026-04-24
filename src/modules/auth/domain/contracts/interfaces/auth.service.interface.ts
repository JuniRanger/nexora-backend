import { LoginRequestDto } from '../../../presentation/dto/requests/login-request';
import { LoginResponseDto } from '../../../presentation/dto/responses/login-response';

export interface IAuthService {
  login(
    dto: LoginRequestDto,
    ipAddress: string,
    userAgent: string,
  ): Promise<LoginResponseDto>;
  logout(sessionId: number): Promise<void>;
}
