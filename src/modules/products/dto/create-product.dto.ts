import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @MaxLength(255)
  @ApiProperty({ example: 'iPhone 16 Ultra Max Pro' })
  title: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: `The best iPhone is obviously going to be different for everyone and really depends on your needs and budget. With the launch of the iPhone 14 series, Apple now sells eight different models that range in price from $429 for the iPhone SE (2022) to $1,599 for an iPhone 14 Pro Max with 1TB of storage.
      The eight iPhone variants Apple currently sells are a mix of new models and phones that date back to 2020. Below are the various models, their release date, the number of rear cameras they have, their processor and their current list price, which for some phones includes a $30 activation fee that's waived if you activate your iPhone on a carrier at the time of purchase.`,
  })
  descriptions?: string;

  @IsArray()
  @ApiPropertyOptional({
    example: ['/images/iPhone16.webp'],
    items: { type: 'string', nullable: true },
  })
  images: string[];

  @IsArray()
  @ApiPropertyOptional({
    example: ['iPhone'],
    items: { type: 'string', nullable: true },
  })
  tags: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  isArchive?: boolean;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 2666 })
  price: number;
}
