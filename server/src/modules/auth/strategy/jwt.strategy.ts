import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt_access_token',
) {
  constructor(configService: ConfigService) {
    const jwtSecretKey = configService.get<string>(
      'JWT_ACCESS_TOKEN_SECRET_KEY',
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretKey,
    });
  }
  validate(payload: any) {
    return payload;
  }
}
