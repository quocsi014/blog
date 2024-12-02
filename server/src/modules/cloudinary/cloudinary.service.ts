import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { ImageDTO } from 'src/dto/image.dto';
@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloud_name'),
      api_key: this.configService.get<string>('cloudinary.api_key'),
      api_secret: this.configService.get<string>('cloudinary.api_secret'),
    });
  }
  async uploadImage(file: Express.Multer.File): Promise<ImageDTO> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'blog/avatar',
    });
    const image: ImageDTO = {
      url: result.secure_url,
      key: result.public_id,
    };
    return image;
  }

  async deleteImage(key: string): Promise<void> {
    await cloudinary.uploader.destroy(key);
  }
}
