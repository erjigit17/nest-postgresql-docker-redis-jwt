import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.productNotFound', error);
  }
}
