import { ApiProperty } from '@nestjs/swagger';

import { ProductDto } from './product.dto';

export class ProductAllResDto {
  @ApiProperty()
  products: ProductDto[];

  @ApiProperty({ example: 212 })
  totalCount: number;
}
