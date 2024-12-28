import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
export type UploadFileResponse = {
  url: string;
  key: string;
};
@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloud_name'),
      api_key: this.configService.get<string>('cloudinary.api_key'),
      api_secret: this.configService.get<string>('cloudinary.api_secret'),
    });
  }
  // async uploadImage(file: Express.Multer.File): Promise<ImageDTO> {
  //   const result = await cloudinary.uploader.upload(file.path, {
  //     folder: 'blog/avatar',
  //   });
  //   const image: ImageDTO = {
  //     url: result.secure_url,
  //     key: result.public_id,
  //   };
  //   return image;
  // }
  //
  // async deleteImage(key: string): Promise<void> {
  //   await cloudinary.uploader.destroy(key);
  // }
  private readonly logger = new Logger(CloudinaryService.name);
  async uploadImage(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<UploadFileResponse> {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderName,
      });
      const res: UploadFileResponse = {
        url: result.secure_url,
        key: result.public_id,
      };
      return res;
    } catch (error) {
      this.logger.error(`Upload file error: ${error.message}`);
      throw new InternalServerErrorException('Some thing went wrong');
    }
  }
  async deleteImage(key: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(key);
    } catch (error) {
      this.logger.error(`Delete file error: ${error.message}`);
    }
  }
}
