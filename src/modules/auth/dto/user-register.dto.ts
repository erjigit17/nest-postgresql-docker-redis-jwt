import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsOptional()
  @MaxLength(255)
  @ApiPropertyOptional({ example: 'John' })
  firstName?: string;

  @MaxLength(255)
  @IsOptional()
  @ApiPropertyOptional({ example: 'Wick' })
  lastName?: string;

  @IsEmail()
  @MaxLength(255)
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @Length(8, 30)
  @ApiProperty()
  password: string;
}
