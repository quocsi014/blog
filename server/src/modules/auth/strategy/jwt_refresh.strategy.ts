import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { tokenPayload } from '../dto/token.dto';
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt_refresh_token',
) {
  constructor(configService: ConfigService) {
    const jwtSecretKey = configService.get<string>(
      'JWT_REFRESH_TOKEN_SECRET_KEY',
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretKey,
    });
  }
  async validate(payload: tokenPayload) {
    return { sub: payload.sub, email: payload.email };
  }
}
