import { Injectable } from '@nestjs/common';
import { CloudinaryService, UploadFileResponse } from '../cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { ImageDTO } from './dto/image.dto';

@Injectable()
export class ImageService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ){}
  async uploadImage(file: Express.Multer.File, folder: string): Promise<Image>{
    const uploadFileResponse: UploadFileResponse = await this.cloudinaryService.uploadImage(file, folder)
    const imageDto: ImageDTO = {
      url: uploadFileResponse.url,
      key: uploadFileResponse.key,
    }
    const createdImage: Image = this.imageRepository.create(imageDto)
    await this.imageRepository.save(createdImage)
    return createdImage;
  }
  async deleteImage(id: number): Promise<boolean> {
    const image = await this.imageRepository.findOneBy({ id: id});
    if (!image){
      return false
    }
    this.cloudinaryService.deleteImage(image.key)
    this.imageRepository.delete(id);
    return true;
  }
}
