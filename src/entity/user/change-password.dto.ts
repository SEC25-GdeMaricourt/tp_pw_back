import { IsNotEmpty, IsEmail } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}