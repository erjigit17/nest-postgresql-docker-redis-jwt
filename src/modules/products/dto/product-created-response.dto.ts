import { ApiProperty } from '@nestjs/swagger';

import { Uuid } from '../../../types-interfaces';

export class ProductCreatedResponseDto {
  @ApiProperty({ example: '9c19cc4-63a0-4770-a6b7-ff0c37efbdc9' })
  guid: Uuid;
}
