import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  SafeUser,
  SortUserFields,
  UpdateUserDTO,
  UserDTO,
} from '../auth/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingResponse } from 'src/dto/paging.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { CustomizedHttpException } from 'src/exceptions/http-exception.exception';
import { ERR_DATAS } from 'src/exceptions/error-code';
import { Image } from '../image/entity/image.entity';
import { ImageService } from '../image/image.service';

@Injectable()
export class UserService {
  private notFoundResource: HttpException = new NotFoundException(
    'No Users Found',
  );
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private readonly imageService: ImageService,
  ) { }
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
      throw new CustomizedHttpException(
        ERR_DATAS.users.create_user.email_exist,
        HttpStatus.CONFLICT,
      );
    }
    this.userRepository.save(userDTO);
  }

  async uploadAvatar(userId: number, file: Express.Multer.File): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const avatar = await this.imageService.uploadImage(file, 'blod/avatar');
    const createdAvatar: Image = this.imageRepository.create(avatar);
    if (user.avatar) {
      this.imageService.deleteImage(user.avatar.id);
    }
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
  ): Promise<PagingResponse<UserDTO>> {
    const whereCondition: any = pagignRes.query
      ? SortUserFields.map((field) => ({
        [field]: Like(`%${pagignRes.query}%`),
      }))
      : undefined;
    const count = await this.userRepository.count({
      where: whereCondition,
    });
    const totalPage =
      Math.floor(count / pagignRes.limit) +
      (count % pagignRes.limit > 0 ? 1 : 0);

    const offset = (pagignRes.page - 1) * pagignRes.limit;
    const order: any = {};
    if (pagignRes.sortBy) {
      order[pagignRes.sortBy] = pagignRes.ascending ? 'ASC' : 'DESC';
      console.log(pagignRes.sortBy);
    }
    const users = await this.userRepository.find({
      skip: offset,
      take: pagignRes.limit,
      where: whereCondition,
      order: order,
    });
    pagignRes.totalPage = totalPage;
    pagignRes.items = users;
    return pagignRes;
  }
  async deleteUser(id: number): Promise<void> {
    const user = this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('No Users Found');
    }
    await this.userRepository.delete(id);
  }
}
