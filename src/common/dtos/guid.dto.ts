import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GuidDto {
  @ApiProperty({ example: 'f9c19cc4-63a0-4770-a6b7-ff0c37efbdc9' })
  @IsUUID()
  giud: string;
}
