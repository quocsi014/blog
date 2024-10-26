import {
  Body,
  Request,
  Controller,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { CreationalPostDto } from './dto/creational-post.dto';
import { Post as PostEntity } from './entity/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostOwnershipGuard } from './guards/post_ownership.guard';
import { Public } from 'src/decorators/public.decorator';
import { PagingResponse } from 'src/dto/paging.dto';
import { link } from 'fs';
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @Roles(Role.Admin, Role.Writer)
  async create(
    @Request() req,
    @Body() postDto: CreationalPostDto,
  ): Promise<PostEntity> {
    postDto.authorId = req.user.id;
    return await this.postService.createPost(postDto);
  }

  @Get(':id')
  @Public()
  async getOne(@Param('id') id: number): Promise<PostEntity> {
    return await this.postService.getOne(id);
  }

  @Get()
  @Public()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    const pagingRes = new PagingResponse<PostEntity>(limit, page);
    pagingRes.process();
    return await this.postService.getAll(pagingRes);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Body() postDto: UpdatePostDto,
    @Param('id') id: number,
  ): Promise<void> {
    return this.postService.updatePost(id, postDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Writer)
  @UseGuards(PostOwnershipGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.postService.deletePost(id);
  }
}
