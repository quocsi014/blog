import { Expose } from 'class-transformer';

export class UpdatePostDto {
  title: string;

  @Expose({ name: 'category_ids' })
  categoryIds: number[];
}
