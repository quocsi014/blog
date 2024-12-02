import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SafeUser, UpdateUserDTO, UserDTO } from '../auth/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingResponse } from 'src/dto/paging.dto';
import { Role } from 'src/enum/role.enum';
import { MailService } from 'src/modules/mail/mail.service';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { Image } from 'src/entity/image.entity';

@Injectable()
export class UserService {
  private notFoundResource: HttpException = new NotFoundException(
    'No Users Found',
  );
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private mailService: MailService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async getUser(userId: number): Promise<SafeUser> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw this.notFoundResource;
    }
    return user;
  }

  async createUser(userDTO: UserDTO) {
    const user = await this.userRepository.findOneBy({
      email: userDTO.email,
    });
    if (user) {
      throw new ConflictException();
    }
    this.userRepository.save(userDTO);
  }

  async uploadAvatar(userId: number, file: Express.Multer.File): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const avatar = await this.cloudinaryService.uploadImage(file);
    const createdAvatar: Image = this.imageRepository.create(avatar);
    // if (user.avatar) {
    //   this.cloudinaryService.deleteImage(user.avatar.key);
    // }
    user.avatar = createdAvatar;
    await this.userRepository.save(user);
  }

  async updateUser(userId: number, updateData: UpdateUserDTO): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw this.notFoundResource;
    }

    user.firstName = updateData.firstName || user.firstName;
    user.lastName = updateData.lastName || user.lastName;
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
