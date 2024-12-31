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
import { SortPostFields } from './dto/post.dto';
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
  @Roles(Role.Admin, Role.Writer)
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('query') query: string,
    @Query('sort_by') sortBy: string,
    @Query('asc') ascending: boolean,
  ) {
    const res = new PagingResponse<PostEntity>(limit, page);
    res.process();
    res.ascending = ascending;
    if (SortPostFields.includes(sortBy)) {
      res.sortBy = sortBy;
    }
    res.query = query;
    return await this.postService.getAll(res);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Writer)
  async update(
    @Request() req,
    @Body() postDto: UpdatePostDto,
    @Param('id') id: number,
  ): Promise<void> {
    return this.postService.updatePost(id, postDto);
  }

  @Put(':id/thumbnail')
  @Roles(Role.Admin, Role.Writer)
  async updateThumbnail() {}

  @Delete(':id')
  @Roles(Role.Admin, Role.Writer)
  @UseGuards(PostOwnershipGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.postService.deletePost(id);
  }
}
