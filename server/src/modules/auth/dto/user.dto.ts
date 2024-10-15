import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
