import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 255)
  name: string;

  @IsEmail()
  @Length(3, 255)
  email: string;

  @Length(8, 20)
  password: string;
}
