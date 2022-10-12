import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length, MaxLength } from 'class-validator';

export class UserRegisterDto {
  @IsOptional()
  @MaxLength(255)
  @ApiPropertyOptional()
  firstName?: string;

  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsEmail()
  @MaxLength(255)
  @ApiProperty()
  email: string;

  @Length(8, 20)
  @ApiProperty()
  password: string;
}
