import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreationalCommentDto {
  @IsNotEmpty()
  content: string;

  user_id: number;

  post_id: number;

  @IsOptional()
  @IsNumber()
  parent_id: number;
}
