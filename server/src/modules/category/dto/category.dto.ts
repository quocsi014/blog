import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  name: string;
}
export const SortCategoryFields = ['name'];
