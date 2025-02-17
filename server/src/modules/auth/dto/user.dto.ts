import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ImageDTO } from 'src/modules/image/dto/image.dto';
import { Role } from 'src/enum/role.enum';
import { Timestamp } from 'typeorm';

export class RegisterUserDTO {
  @Expose({ name: 'first_name' })
  @IsNotEmpty()
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsNotEmpty()
  lastName: string;

  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginUserDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'Role must be one of the following values: READER, WRITER, ADMIN',
  })
  role: Role;
}

export class UserDTO {
  id: number;
  @IsNotEmpty()
  email: string;
  @Expose({ name: 'first_name' })
  lastName: string;
  @Expose({ name: 'last_name' })
  firstName: string;
  @IsNotEmpty()
  role: Role;
  @Expose({ name: 'avatar' })
  avatar: ImageDTO;
  @IsNotEmpty()
  password: string;
  @Expose({ name: 'created_at' })
  createdAt: Timestamp;
  @Expose({ name: 'updated_at' })
  updatedAt: Timestamp;
}

export const SortUserFields = [
  'id',
  'email',
  'role',
  'firstName',
  'lastName',
  'createdAt',
  'updatedAt',
];

export const QueryUserFields = ['id', 'email', 'role', 'firstName', 'lastName'];

export type SafeUser = Omit<InstanceType<typeof UserDTO>, 'password'>;

export class EmailDTO {
  @IsEmail()
  email: string;
}
export class NewPasswordDTO {
  @IsNotEmpty()
  password: string;
}
