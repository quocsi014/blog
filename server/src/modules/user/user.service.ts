import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDTO, UserDTO } from '../auth/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingResponse } from 'src/dto/paging.dto';
import { Role } from 'src/enum/role.enum';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class UserService {
  private notFoundResource: HttpException = new NotFoundException(
    'No Users Found',
  );
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}
  async getUser(userId: number): Promise<UserDTO> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw this.notFoundResource;
    }
    delete user.password;
    return user;
  }

  async updateUser(userId: number, updateData: UpdateUserDTO): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw this.notFoundResource;
    }

    user.firstName = updateData.firstName || user.firstName;
    user.lastName = updateData.lastName || user.lastName;
    user.avatarUrl = updateData.avatarUrl || user.avatarUrl;
    user.role = updateData.role || user.role;
    await this.userRepository.save(user);
  }

  async getAllUser(
    pagignRes: PagingResponse<UserDTO>,
    role: Role,
  ): Promise<PagingResponse<UserDTO>> {
    const count = await this.userRepository.count({
      where: {
        role: role,
      },
    });
    const totalPage =
      Math.floor(count / pagignRes.limit) +
      (count % pagignRes.limit > 0 ? 1 : 0);

    const offset = (pagignRes.page - 1) * pagignRes.limit;
    const users = await this.userRepository.find({
      skip: offset,
      take: pagignRes.limit,
      where: {
        role: role,
      },
    });
    pagignRes.totalPage = totalPage;
    pagignRes.items = users;
    return pagignRes;
  }
}
