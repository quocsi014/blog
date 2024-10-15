import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UserController {
  @Get('/me')
  @UseGuards(JwtGuard)
  me(): string {
    return 'me';
  }
}
