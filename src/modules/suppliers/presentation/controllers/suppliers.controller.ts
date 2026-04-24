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
import { ISuppliersService } from '../../domain/contracts/interfaces/suppliers.service.interface';
import { SUPPLIERS_SERVICE_TOKEN } from '../../suppliers.tokens';
import { CreateSupplierRequestDto } from '../dto/requests/create-supplier.request';
import { UpdateSupplierRequestDto } from '../dto/requests/update-supplier.request';
import { SupplierResponseDto } from '../dto/responses/supplier.response';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    @Inject(SUPPLIERS_SERVICE_TOKEN)
    private readonly suppliersService: ISuppliersService,
  ) {}

  @Post()
  create(@Body() dto: CreateSupplierRequestDto): Promise<SupplierResponseDto> {
    return this.suppliersService.create(dto);
  }

  @Get()
  findAll(): Promise<SupplierResponseDto[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SupplierResponseDto> {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupplierRequestDto,
  ): Promise<SupplierResponseDto> {
    return this.suppliersService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.suppliersService.remove(id);
    return { message: 'Supplier soft deleted successfully' };
  }
}
