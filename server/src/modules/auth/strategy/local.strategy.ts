import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { tokenPayload } from '../dto/token.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Đổi tên trường từ 'username' sang 'email'
      passwordField: 'password', // Bạn có thể đổi 'password' nếu muốn
    });
  }

  async validate(email: string, password: string): Promise<tokenPayload> {
    const user = await this.authService.validateUser(email, password); // Lưu ý đổi lại tham số ở đây
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
