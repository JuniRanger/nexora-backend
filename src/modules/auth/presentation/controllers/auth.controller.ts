import {
  Body,
  Controller,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginRequestDto } from '../dto/requests/login-request';
import { LoginResponseDto } from '../dto/responses/login-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() dto: LoginRequestDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent?: string,
  ): Promise<LoginResponseDto> {
    return this.authService.login(dto, ipAddress, userAgent ?? '');
  }

  @Post('logout/:sessionId')
  async logout(
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<{ message: string }> {
    await this.authService.logout(sessionId);
    return { message: 'Logout successful' };
  }
}
