import { ApiProperty } from '@nestjs/swagger';

import type { AbstractEntity } from './abstract.entity';

export class AbstractDto {
  @ApiProperty({ example: 'f9c19cc4-63a0-4770-a6b7-ff0c37efbdc9' })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;

    const fields: Record<string, string> = {};

    Object.assign(this, fields);
  }
}
