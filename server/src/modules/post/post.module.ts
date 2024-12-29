import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { Category } from '../category/entity/category.entity';
import { User } from '../user/entities/user.entity';
import { Image } from '../image/entity/image.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, User, Image]), ImageModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
