import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ProductNotFoundException } from '../../exceptions';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(
    productDto: CreateProductDto,
    ownerId: string,
  ): Promise<ProductEntity> {
    const images = productDto.images ? productDto.images : [];
    const tags = productDto.tags ? productDto.tags : [];

    return this.productRepository.save({
      ...productDto,
      images,
      tags,
      owner: { id: ownerId }, // TODO improve here
    });
  }

  async findOneById(id: string): Promise<ProductEntity> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'user');

    queryBuilder.where({ id });
    const productEntity = await queryBuilder.getOne();

    if (!productEntity) {
      throw new ProductNotFoundException('product not found');
    }

    return productEntity;
  }

  async update(id: string, update: UpdateProductDto): Promise<UpdateResult> {
    return this.productRepository.update(id, update);
  }

  async softDelete(id: string): Promise<ProductEntity> {
    const oldProduct = await this.findOneById(id);

    return this.productRepository.save({ ...oldProduct, isArchive: true });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
