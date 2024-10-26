import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PostService } from '../post.service';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class PostOwnershipGuard implements CanActivate {
  constructor(private postService: PostService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (user.role === Role.Admin) {
      return true;
    }

    const postId = request.params.id;
    const post = await this.postService.getOne(postId);

    if (post.author.id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
