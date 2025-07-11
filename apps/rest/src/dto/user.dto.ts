import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  username: string;

  @IsString()
  lastName: string;

  @IsString()
  firstName: string;
}
