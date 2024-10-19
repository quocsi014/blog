import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDTO, UserDTO } from '../auth/dto/user.dto';
import { UserService } from './user.service';
import { PagingResponse } from 'src/dto/paging.dto';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //Me
  @Get('/me')
  getMe(@Request() req): Promise<UserDTO> {
    const userId = req.user.sub;
    return this.userService.getUser(userId);
  }

  @Put('me')
  async updateMe(@Body() user: UpdateUserDTO, @Request() req): Promise<void> {
    user.role = null;
    await this.userService.updateUser(req.user.sub, user);
  }

  //Admin
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get('')
  async getAllUsers(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('role') role: Role,
  ): Promise<PagingResponse<UserDTO>> {
    const res = new PagingResponse<UserDTO>(limit, page);
    res.process();
    return await this.userService.getAllUser(res, role);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateUser(
    @Body() user: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<void> {
    await this.userService.updateUser(id, user);
  }
}
