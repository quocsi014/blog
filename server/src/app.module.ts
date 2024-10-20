import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/databases/databases.module';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards/jwt.guard';
import { MailService } from './modules/mail/mail.service';
import { MailModule } from './modules/mail/mail.module';
import mailConfig from './config/mail.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig, jwtConfig, mailConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    MailService,
  ],
})
export class AppModule {}
