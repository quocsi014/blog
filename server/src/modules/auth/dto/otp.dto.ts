import { IsEmail } from 'class-validator';

export class OtpDto {
  @IsEmail()
  email: string;
  otp: number;
}
