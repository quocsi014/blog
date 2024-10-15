import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { LoginUserDTO } from './dto/user.dto';
import { JwtRefreshGuard } from './guards/jwt_refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() registerUser: RegisterUserDTO): Promise<User> {
    return this.authService.register(registerUser);
  }

  @Post('login')
  login(
    @Body() loginUserDTO: LoginUserDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.login(loginUserDTO);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Request() req,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return await this.authService.refreshToken(req);
  }
}
