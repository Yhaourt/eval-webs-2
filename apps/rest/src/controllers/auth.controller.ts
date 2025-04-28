import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInputDto, LoginOutputDto } from '../dto/login.dto';
import { AuthService } from '@app/common/auth/auth.service';

@Controller('/api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginInputDto): Promise<LoginOutputDto> {
    const { email, password } = data;

    try {
      const tokenResponse = await this.authService.login(email, password);
      return tokenResponse;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
