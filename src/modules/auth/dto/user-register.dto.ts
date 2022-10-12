import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, Matches, MaxLength } from 'class-validator';

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

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/)
  @ApiProperty()
  password: string;
}
