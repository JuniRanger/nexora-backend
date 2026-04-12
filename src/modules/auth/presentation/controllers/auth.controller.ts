import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.loginUseCase.execute(body);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.registerUseCase.execute(body);
  }
}
