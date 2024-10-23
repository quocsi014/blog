import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtOtpStrategy extends PassportStrategy(
  Strategy,
  'jwt_otp_token',
) {
  constructor(configService: ConfigService) {
    const jwtSecretKey = configService.get<string>('jwt.secretKey.otpToken');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretKey,
    });
  }
  async validate(payload) {
    return payload;
  }
}
