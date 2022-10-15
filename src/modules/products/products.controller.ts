import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UUIDParam } from '../../decorators/http.decorators';
import { UserCnx } from '../../decorators/user-context.decorator';
import { Uuid } from '../../types-interfaces';
import { TokenPayloadDto } from '../auth/dto';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { ProductAllQueryDto } from './dto/product-all-query-sring.dto';
import { ProductAllResDto } from './dto/product-all-res.dto';
import { ProductCreatedResponseDto } from './dto/product-created-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('JWT-auth')
@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Searching, sorting, pagination' })
  async getAllProducts(
    @Query() query: ProductAllQueryDto,
  ): Promise<ProductAllResDto> {
    return this.productsService.getProducts(query);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created.',
    type: ProductCreatedResponseDto,
  })
  async create(
    @UserCnx() user: TokenPayloadDto,
    @Body() product: CreateProductDto,
  ): Promise<ProductCreatedResponseDto> {
    const productEntity = await this.productsService.create(
      product,
      user.userId,
    );

    return { guid: productEntity.id };
  }

  @Get('/:guid')
  @ApiOkResponse({ description: 'Get product by id', type: ProductDto })
  async getProduct(@UUIDParam('guid') guid: Uuid): Promise<ProductDto> {
    return this.productsService.findOneById(guid);
  }

  @Patch('/:guid')
  @ApiOkResponse({ description: 'Product updated' })
  update(
    @UUIDParam('guid') guid: Uuid,
    @Body() updateDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productsService.update(guid, updateDto);
  }

  @Delete('/:guid/toArchive')
  @ApiOkResponse({ description: 'Product archived' })
  async softDelete(
    @UUIDParam('guid') guid: Uuid,
  ): Promise<{ isArchive: boolean }> {
    const { isArchive } = await this.productsService.softDelete(guid);

    return { isArchive };
  }

  @Delete('/:guid')
  @ApiOperation({ summary: 'Just for cleaning after tests' })
  remove(@UUIDParam('guid') guid: Uuid): Promise<DeleteResult> {
    return this.productsService.remove(guid);
  }
}
