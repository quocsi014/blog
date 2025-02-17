import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { Image } from '../image/entity/image.entity';
import { ImageModule } from '../image/image.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Image]),
    MailModule,
    ImageModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
