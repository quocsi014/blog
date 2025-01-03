import { BlogStatus } from 'src/enum/blog-status.role';
import { UserDTO } from 'src/modules/auth/dto/user.dto';
import { CategoryDto } from 'src/modules/category/dto/category.dto';
import { Image } from 'src/modules/image/entity/image.entity';
import { Timestamp } from 'typeorm';

export class PostDto {
  id: number;

  title: string;

  thumbnail: Image;

  status: BlogStatus;

  categories: CategoryDto[];

  author: UserDTO;

  createdAt: Timestamp;
}

export const SortPostFields = ['id', 'title', 'createdAt'];

export const QueryPostFields = ['id', 'title', 'status'];
