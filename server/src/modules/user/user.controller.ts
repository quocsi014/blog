import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SafeUser, UpdateUserDTO, UserDTO } from '../auth/dto/user.dto';
import { UserService } from './user.service';
import { PagingResponse } from 'src/dto/paging.dto';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { unlink } from 'fs';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //Me
  @Get('/me')
  getMe(@Request() req): Promise<SafeUser> {
    const userId = req.user.id;
    return this.userService.getUser(userId);
  }

  @Put('me')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updateMe(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: /^image\/(png|jpeg|jpg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('user') userData,
    @Request() req,
  ): Promise<void> {
    const user = plainToInstance(UpdateUserDTO, JSON.parse(userData), {
      strategy: 'excludeAll', // Nếu muốn bỏ qua các field không nằm trong DTO
      excludeExtraneousValues: true, // Chỉ lấy các field được khai báo trong DTO
      enableImplicitConversion: true, // Tự động chuyển đổi kiểu
    });
    user.role = null;
    await Promise.all([
      this.userService.uploadAvatar(req.user.id, file),
      this.userService.updateUser(req.user.id, user),
    ]);
    unlink(file.path, (error) => {
      if (error) {
        console.error('Error deleting file:', error);
      }
    });
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
  @Post('')
  async createUser(@Body() user: UserDTO) {
    await this.userService.createUser(user);
    return;
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updateUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: /^image\/(png|jpeg|jpg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: number,
    @Body('user') userData,
  ): Promise<void> {
    const user = plainToInstance(UpdateUserDTO, JSON.parse(userData), {
      strategy: 'excludeAll', // Nếu muốn bỏ qua các field không nằm trong DTO
      excludeExtraneousValues: true, // Chỉ lấy các field được khai báo trong DTO
      enableImplicitConversion: true, // Tự động chuyển đổi kiểu
    });
    console.log(user);
    await Promise.all([
      this.userService.uploadAvatar(id, file),
      this.userService.updateUser(id, user),
    ]);
    unlink(file.path, (error) => {
      if (error) {
        console.error('Error deleting file:', error);
      }
    });
  }
}
