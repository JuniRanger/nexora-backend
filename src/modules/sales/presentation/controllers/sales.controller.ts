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
import { ISalesService } from '../../domain/contracts/interfaces/sales.service.interface';
import { SALES_SERVICE_TOKEN } from '../../sales.tokens';
import { CreateSaleRequestDto } from '../dto/requests/create-sale.request';
import { UpdateSaleRequestDto } from '../dto/requests/update-sale.request';
import { SaleResponseDto } from '../dto/responses/sale.response';

@Controller('sales')
export class SalesController {
  constructor(
    @Inject(SALES_SERVICE_TOKEN)
    private readonly salesService: ISalesService,
  ) {}

  @Post()
  create(@Body() dto: CreateSaleRequestDto): Promise<SaleResponseDto> {
    return this.salesService.create(dto);
  }

  @Get()
  findAll(): Promise<SaleResponseDto[]> {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SaleResponseDto> {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSaleRequestDto,
  ): Promise<SaleResponseDto> {
    return this.salesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.salesService.remove(id);
    return { message: 'Sale soft deleted successfully' };
  }
}
