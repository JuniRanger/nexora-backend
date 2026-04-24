import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleRequestDto } from '../../presentation/dto/requests/create-sale.request';
import { UpdateSaleRequestDto } from '../../presentation/dto/requests/update-sale.request';
import { SaleResponseDto } from '../../presentation/dto/responses/sale.response';
import { ISalesService } from '../../domain/contracts/interfaces/sales.service.interface';
import { ISalesRepository } from '../../domain/contracts/interfaces/sales.repository.interface';
import { SALES_REPOSITORY_TOKEN } from '../../sales.tokens';

@Injectable()
export class SalesService implements ISalesService {
  constructor(
    @Inject(SALES_REPOSITORY_TOKEN)
    private readonly salesRepository: ISalesRepository,
  ) {}

  create(dto: CreateSaleRequestDto): Promise<SaleResponseDto> {
    return this.salesRepository.create(dto);
  }

  findAll(): Promise<SaleResponseDto[]> {
    return this.salesRepository.findAll();
  }

  async findOne(id: number): Promise<SaleResponseDto> {
    const sale = await this.salesRepository.findById(id);
    if (!sale || !sale.isActive) {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }
    return sale;
  }

  update(id: number, dto: UpdateSaleRequestDto): Promise<SaleResponseDto> {
    return this.salesRepository.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.salesRepository.softDelete(id);
  }
}
