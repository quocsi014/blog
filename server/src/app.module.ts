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
      load: [dbConfig, jwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
