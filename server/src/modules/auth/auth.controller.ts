import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { JwtRefreshGuard } from './guards/jwt_refresh.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @Public()
  register(@Body() registerUser: RegisterUserDTO): Promise<User> {
    return this.authService.register(registerUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  login(
    @Request() req,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = req.user;
    return this.authService.login({ sub: user.id, email: user.email });
  }

  @UseGuards(JwtRefreshGuard)
  @Public()
  @Post('refresh')
  async refresh(
    @Request() req,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return await this.authService.refreshToken(req);
  }
}
