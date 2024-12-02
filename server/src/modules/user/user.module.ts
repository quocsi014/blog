import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { Image } from 'src/entity/image.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Image]),
    MailModule,
    CloudinaryModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
