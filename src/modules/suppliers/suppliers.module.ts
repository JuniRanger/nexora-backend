import { Module } from '@nestjs/common';
import { SuppliersService } from './application/services/suppliers.service';
import { SuppliersRepository } from './infrastructure/repositories/suppliers.repository';
import { SuppliersController } from './presentation/controllers/suppliers.controller';
import {
  SUPPLIERS_REPOSITORY_TOKEN,
  SUPPLIERS_SERVICE_TOKEN,
} from './suppliers.tokens';

@Module({
  controllers: [SuppliersController],
  providers: [
    SuppliersService,
    {
      provide: SUPPLIERS_SERVICE_TOKEN,
      useExisting: SuppliersService,
    },
    {
      provide: SUPPLIERS_REPOSITORY_TOKEN,
      useClass: SuppliersRepository,
    },
  ],
  exports: [SuppliersService, SUPPLIERS_SERVICE_TOKEN, SUPPLIERS_REPOSITORY_TOKEN],
})
export class SuppliersModule {}
