import { Body, Controller, Post } from '@nestjs/common';
import { CreateSaleUseCase } from '../../application/use-cases/create-sale.use-case';
import { CreateSaleDto } from '../dtos/create-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly createSaleUseCase: CreateSaleUseCase) {}

  @Post()
  create(@Body() body: CreateSaleDto) {
    return this.createSaleUseCase.execute(body);
  }
}
