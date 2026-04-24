import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierRequestDto } from '../../presentation/dto/requests/create-supplier.request';
import { UpdateSupplierRequestDto } from '../../presentation/dto/requests/update-supplier.request';
import { SupplierResponseDto } from '../../presentation/dto/responses/supplier.response';
import { ISuppliersService } from '../../domain/contracts/interfaces/suppliers.service.interface';
import { ISuppliersRepository } from '../../domain/contracts/interfaces/suppliers.repository.interface';
import { SUPPLIERS_REPOSITORY_TOKEN } from '../../suppliers.tokens';

@Injectable()
export class SuppliersService implements ISuppliersService {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY_TOKEN)
    private readonly suppliersRepository: ISuppliersRepository,
  ) {}

  create(dto: CreateSupplierRequestDto): Promise<SupplierResponseDto> {
    return this.suppliersRepository.create(dto);
  }

  findAll(): Promise<SupplierResponseDto[]> {
    return this.suppliersRepository.findAll();
  }

  async findOne(id: number): Promise<SupplierResponseDto> {
    const supplier = await this.suppliersRepository.findById(id);
    if (!supplier || !supplier.isActive) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return supplier;
  }

  update(id: number, dto: UpdateSupplierRequestDto): Promise<SupplierResponseDto> {
    return this.suppliersRepository.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.suppliersRepository.softDelete(id);
  }
}
