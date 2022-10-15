import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ProductNotFoundException } from '../../exceptions';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductAllQueryDto } from './dto/product-all-query-sring.dto';
import { ProductAllResDto } from './dto/product-all-res.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProducts(query: ProductAllQueryDto): Promise<ProductAllResDto> {
    // pagination
    const page = query.page || 1;
    const limit = query.perPage || 10;
    const offset = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.isArchive = false');

    // full test search
    if (query.searchText) {
      const text = query.searchText;
      const field = query.searchField || 'title';
      queryBuilder.andWhere(
        `to_tsvector(product.${field}) @@ to_tsquery(:text)`,
        { text },
      );
    }

    // sorting
    if (query.priceSort) {
      queryBuilder.orderBy('product.price', query.priceSort);
    }

    const totalCount = await queryBuilder.getCount();

    const products = await queryBuilder
      .skip(offset) // rowsPerPage
      .take(limit) // page
      .select()
      .getMany();

    return { products, totalCount };
  }

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
