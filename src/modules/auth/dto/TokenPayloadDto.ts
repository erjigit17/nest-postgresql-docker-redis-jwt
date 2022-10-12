import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { RoleType } from '../../../constants';
import { Uuid } from '../../../types-interfaces';

export class TokenPayloadDto {
  @ApiProperty()
  @IsString()
  role: RoleType;

  @ApiProperty()
  @IsString()
  userId: Uuid;
}
