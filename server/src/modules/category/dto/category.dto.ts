import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CategoryDto {
  @IsNotEmpty()
  name: string;

  @Expose({ name: 'created_at' })
  createdAt: Timestamp;
}
export const SortCategoryFields = ['name', 'createdAt'];
