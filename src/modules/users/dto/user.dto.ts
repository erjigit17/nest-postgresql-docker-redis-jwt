import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../constants';

export class UserDto {
  @ApiProperty({ example: 'f9c19cc4-63a0-4770-a6b7-ff0c37efbdc9' })
  id: string;

  @ApiPropertyOptional({ example: 'Jimmy' })
  firstName?: string;

  @ApiPropertyOptional({ example: 'Fallon' })
  lastName?: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiProperty({ example: 'fallon.j@gmail.com' })
  email: string;

  @ApiPropertyOptional({
    example: '/avatars/f9c19cc4-63a0-4770-a6b7-ff0c37efbdc9.webp',
  })
  avatar?: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
