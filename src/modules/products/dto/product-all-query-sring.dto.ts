import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

enum Sort {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

enum SearchFields {
  'title' = 'title',
  'descriptions' = 'descriptions',
}

export class ProductAllQueryDto {
  @ApiPropertyOptional({ default: 'title' })
  @IsOptional()
  @IsEnum(SearchFields)
  searchField?: SearchFields;

  @ApiPropertyOptional()
  @IsOptional()
  searchText?: string;

  @ApiPropertyOptional()
  @IsEnum(Sort)
  priceSort?: Sort;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Min(1)
  @IsInt()
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Min(1)
  @Max(33)
  @IsInt()
  perPage?: number;
}
