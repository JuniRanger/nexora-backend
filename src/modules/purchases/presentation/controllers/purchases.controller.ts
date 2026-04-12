import { Body, Controller, Post } from '@nestjs/common';
import { CreatePurchaseUseCase } from '../../application/use-cases/create-purchase.use-case';
import { CreatePurchaseDto } from '../dtos/create-purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly createPurchaseUseCase: CreatePurchaseUseCase) {}

  @Post()
  create(@Body() body: CreatePurchaseDto) {
    return this.createPurchaseUseCase.execute(body);
  }
}
