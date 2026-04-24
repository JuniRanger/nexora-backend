import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { IProductsService } from '../../domain/contracts/interfaces/products.service.interface';
import { PRODUCTS_SERVICE_TOKEN } from '../../products.tokens';
import { CreateProductRequestDto } from '../dto/requests/create-product.request';
import { UpdateProductRequestDto } from '../dto/requests/update-product.request';
import { ProductResponseDto } from '../dto/responses/product.response';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE_TOKEN)
    private readonly productsService: IProductsService,
  ) {}

  @Post()
  create(@Body() dto: CreateProductRequestDto): Promise<ProductResponseDto> {
    return this.productsService.create(dto);
  }

  @Get()
  findAll(): Promise<ProductResponseDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.productsService.remove(id);
    return { message: 'Product soft deleted successfully' };
  }
}
