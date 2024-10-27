import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
import { CreationalCommentDto } from './dto/creational_comment.dto';
import { PagingResponse } from 'src/dto/paging.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('posts/:post_id/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async create(
    @Body() commentDto: CreationalCommentDto,
    @Param('post_id') postId: number,
    @Request() req,
  ): Promise<Comment> {
    commentDto.user_id = req.user.id;
    commentDto.post_id = postId;
    return this.commentService.createComment(commentDto);
  }

  @Get()
  @Public()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Param('post_id') postId: number,
  ): Promise<PagingResponse<Comment>> {
    const pagingRes = new PagingResponse<Comment>(limit, page);
    pagingRes.process();
    return await this.commentService.getAllComment(postId, pagingRes);
  }

  @Get('/:id/childs')
  @Public()
  async getAllChild(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Param('id') commentId: number,
  ): Promise<PagingResponse<Comment>> {
    const pagingRes = new PagingResponse<Comment>(limit, page);
    pagingRes.process();
    return await this.commentService.getAllChild(commentId, pagingRes);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.commentService.deleteComment(id);
  }
}
