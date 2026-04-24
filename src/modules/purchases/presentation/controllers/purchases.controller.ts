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
import { IPurchasesService } from '../../domain/contracts/interfaces/purchases.service.interface';
import { PURCHASES_SERVICE_TOKEN } from '../../purchases.tokens';
import { CreatePurchaseRequestDto } from '../dto/requests/create-purchase.request';
import { UpdatePurchaseRequestDto } from '../dto/requests/update-purchase.request';
import { PurchaseResponseDto } from '../dto/responses/purchase.response';

@Controller('purchases')
export class PurchasesController {
  constructor(
    @Inject(PURCHASES_SERVICE_TOKEN)
    private readonly purchasesService: IPurchasesService,
  ) {}

  @Post()
  create(@Body() dto: CreatePurchaseRequestDto): Promise<PurchaseResponseDto> {
    return this.purchasesService.create(dto);
  }

  @Get()
  findAll(): Promise<PurchaseResponseDto[]> {
    return this.purchasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PurchaseResponseDto> {
    return this.purchasesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePurchaseRequestDto,
  ): Promise<PurchaseResponseDto> {
    return this.purchasesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.purchasesService.remove(id);
    return { message: 'Purchase soft deleted successfully' };
  }
}
