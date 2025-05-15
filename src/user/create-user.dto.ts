import { IsEmail, IsString, MinLength, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @MinLength(8)
  password: string;
}
