import { Module } from '@nestjs/common';
import { ClientsService } from './application/services/clients.service';
import { ClientsRepository } from './infrastructure/repositories/clients.repository';
import { ClientsController } from './presentation/controllers/clients.controller';
import { CLIENTS_REPOSITORY_TOKEN, CLIENTS_SERVICE_TOKEN } from './clients.tokens';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: CLIENTS_SERVICE_TOKEN,
      useExisting: ClientsService,
    },
    {
      provide: CLIENTS_REPOSITORY_TOKEN,
      useClass: ClientsRepository,
    },
  ],
  exports: [ClientsService, CLIENTS_SERVICE_TOKEN, CLIENTS_REPOSITORY_TOKEN],
})
export class ClientsModule {}
