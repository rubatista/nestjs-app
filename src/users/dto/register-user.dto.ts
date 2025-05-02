import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
