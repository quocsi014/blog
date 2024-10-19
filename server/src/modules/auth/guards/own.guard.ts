import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class OwnGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.role == Role.Admin) {
      return true;
    }
  }
}
