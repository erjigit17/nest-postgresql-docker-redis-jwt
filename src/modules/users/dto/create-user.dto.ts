import { IsEmail, IsOptional, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @MaxLength(255)
  firstName?: string;

  @MaxLength(255)
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @Length(8, 20)
  password: string;
}
