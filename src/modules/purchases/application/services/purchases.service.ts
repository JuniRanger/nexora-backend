import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseRequestDto } from '../../presentation/dto/requests/create-purchase.request';
import { UpdatePurchaseRequestDto } from '../../presentation/dto/requests/update-purchase.request';
import { PurchaseResponseDto } from '../../presentation/dto/responses/purchase.response';
import { IPurchasesService } from '../../domain/contracts/interfaces/purchases.service.interface';
import { IPurchasesRepository } from '../../domain/contracts/interfaces/purchases.repository.interface';
import { PURCHASES_REPOSITORY_TOKEN } from '../../purchases.tokens';

@Injectable()
export class PurchasesService implements IPurchasesService {
  constructor(
    @Inject(PURCHASES_REPOSITORY_TOKEN)
    private readonly purchasesRepository: IPurchasesRepository,
  ) {}

  create(dto: CreatePurchaseRequestDto): Promise<PurchaseResponseDto> {
    return this.purchasesRepository.create(dto);
  }

  findAll(): Promise<PurchaseResponseDto[]> {
    return this.purchasesRepository.findAll();
  }

  async findOne(id: number): Promise<PurchaseResponseDto> {
    const purchase = await this.purchasesRepository.findById(id);
    if (!purchase || !purchase.isActive) {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
    return purchase;
  }

  update(id: number, dto: UpdatePurchaseRequestDto): Promise<PurchaseResponseDto> {
    return this.purchasesRepository.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.purchasesRepository.softDelete(id);
  }
}
