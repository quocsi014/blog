import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { EmailDTO, NewPasswordDTO, RegisterUserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { JwtRefreshGuard } from './guards/jwt_refresh.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from 'src/decorators/public.decorator';
import { OtpDto } from './dto/otp.dto';
import { JwtOtpGuard } from './guards/jwt_otp.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @Public()
  @UseGuards(JwtOtpGuard)
  register(
    @Body() registerUser: RegisterUserDTO,
    @Request()
    req,
  ): Promise<User> {
    registerUser.email = req.user.email;
    return this.authService.register(registerUser);
  }

  @Post('reset_password')
  @Public()
  @UseGuards(JwtOtpGuard)
  forgotPassword(@Body() data: NewPasswordDTO, @Request() req) {
    return this.authService.changePassword(req.user.email, data.password);
  }

  @Post('request_otp')
  @Public()
  async requestOtp(@Body() body: EmailDTO): Promise<null> {
    return this.authService.requestOtp(body.email);
  }

  @Post('verify_otp')
  @Public()
  async verifyOtp(@Body() body: OtpDto): Promise<{ token: string }> {
    return this.authService.verifyOtp(body);
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
