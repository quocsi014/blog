import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  providers: [ImageService],
  imports: [
  TypeOrmModule.forFeature([Image]),
    CloudinaryModule
  ],
  exports:[ImageService],
})
export class ImageModule {}
