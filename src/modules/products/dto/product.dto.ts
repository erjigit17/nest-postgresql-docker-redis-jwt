import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserDto } from '../../users/dto';

export class ProductDto {
  @ApiProperty({ example: 'f9c19cc4-63a0-4770-a6b7-ff0c37efbdc9' })
  id: string;

  @ApiProperty({ example: 'iPhone 21 nano se' })
  title: string;

  @ApiPropertyOptional({ example: 'iPhone 21 nano se, lorem ipsum...' })
  descriptions?: string;

  @ApiPropertyOptional({ example: ['/iPhone_21_nano_se.webp'] })
  images?: string[];

  @ApiPropertyOptional({ example: ['iPhone', 'nano'] })
  tags?: string[];

  @ApiProperty({ example: 666 })
  price: number;

  @ApiProperty({ example: false })
  isArchive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  owner: UserDto;
}
