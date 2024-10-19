import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enum/role.enum';
import { Timestamp } from 'typeorm';

export class RegisterUserDTO {
  @Expose({ name: 'first_name' })
  @IsNotEmpty()
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
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

  @Expose({ name: 'avatar_url' })
  avatarUrl: string;

  @IsEnum(Role, {
    message: 'Role must be one of the following values: READER, WRITER, ADMIN',
  })
  role: Role;
}

export class UserDTO {
  id: number;
  email: string;
  @Expose({ name: 'first_name' })
  lastName: string;
  @Expose({ name: 'last_name' })
  firstName: string;
  role: Role;
  @Expose({ name: 'avatar_url' })
  avatarUrl: string;
  @Expose({ name: 'created_at' })
  createdAt: Timestamp;
  @Expose({ name: 'updated_at' })
  updatedAt: Timestamp;
}
