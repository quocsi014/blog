import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtRefreshStrategy, JwtStrategy } from './strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { MailModule } from '../mail/mail.module';
import { JwtOtpStrategy } from './strategy/jwt_otp.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtOtpStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
