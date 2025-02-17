import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreationalPostDto {
  @IsNotEmpty()
  title: string;

  @Expose({ name: 'category_ids' })
  categoryIds: number[];

  authorId: number;
}
