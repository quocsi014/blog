import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { CreationalCommentDto } from './dto/creational_comment.dto';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { PagingResponse } from 'src/dto/paging.dto';

@Injectable()
export class CommentService {
  notFoundResource = new NotFoundException('No Comments Found');
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private userService: UserService,
    private postService: PostService,
  ) {}

  async getBriefOne(id: number): Promise<Comment> {
    const comment = this.commentRepository.findOneBy({ id: id });

    if (!comment) {
      throw this.notFoundResource;
    }
    return comment;
  }

  async createComment(commentDto: CreationalCommentDto): Promise<Comment> {
    const { post_id, user_id, parent_id, ...commentData } = commentDto;

    const post = await this.postService.getBriefOne(post_id);
    const user = await this.userService.getUser(user_id);
    let parent: Comment = null;
    if (parent_id) {
      parent = await this.getBriefOne(parent_id);
    }
    const comment = this.commentRepository.create({
      post,
      user,
      parent,
      ...commentData,
    });

    const commentSaved = await this.commentRepository.save(comment);
    return commentSaved;
  }

  async getAllComment(
    postId: number,
    pagingRes: PagingResponse<Comment>,
  ): Promise<PagingResponse<Comment>> {
    const count = await this.commentRepository.countBy({
      post: { id: postId },
    });

    const totalPage =
      Math.floor(count / pagingRes.limit) +
      (count % pagingRes.limit > 0 ? 1 : 0);

    const offset = (pagingRes.page - 1) * pagingRes.limit;
    const comments = await this.commentRepository.find({
      where: { post: { id: postId } },
      skip: offset,
      take: pagingRes.limit,
    });

    pagingRes.totalPage = totalPage;
    pagingRes.items = comments;
    return pagingRes;
  }

  async getAllChild(
    commentId: number,
    pagingRes: PagingResponse<Comment>,
  ): Promise<PagingResponse<Comment>> {
    const count = await this.commentRepository.countBy({
      parent: { id: commentId },
    });

    const totalPage =
      Math.floor(count / pagingRes.limit) +
      (count % pagingRes.limit > 0 ? 1 : 0);

    const offset = (pagingRes.page - 1) * pagingRes.limit;
    const comments = await this.commentRepository.find({
      where: { parent: { id: commentId } },
      skip: offset,
      take: pagingRes.limit,
    });

    pagingRes.totalPage = totalPage;
    pagingRes.items = comments;
    return pagingRes;
  }

  async deleteComment(id: number): Promise<void> {
    const comment = await this.getBriefOne(id);
    await this.commentRepository.remove(comment);
  }
}
