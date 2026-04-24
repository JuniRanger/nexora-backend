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
import { IAccountingService } from '../../domain/contracts/interfaces/accounting.service.interface';
import { ACCOUNTING_SERVICE_TOKEN } from '../../accounting.tokens';
import { CreateAccountingEntryRequestDto } from '../dto/requests/create-accounting-entry.request';
import { UpdateAccountingEntryRequestDto } from '../dto/requests/update-accounting-entry.request';
import { AccountingEntryResponseDto } from '../dto/responses/accounting-entry.response';

@Controller('accounting')
export class AccountingController {
  constructor(
    @Inject(ACCOUNTING_SERVICE_TOKEN)
    private readonly accountingService: IAccountingService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateAccountingEntryRequestDto,
  ): Promise<AccountingEntryResponseDto> {
    return this.accountingService.create(dto);
  }

  @Get()
  findAll(): Promise<AccountingEntryResponseDto[]> {
    return this.accountingService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AccountingEntryResponseDto> {
    return this.accountingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAccountingEntryRequestDto,
  ): Promise<AccountingEntryResponseDto> {
    return this.accountingService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.accountingService.remove(id);
    return { message: 'Accounting entry soft deleted successfully' };
  }
}
