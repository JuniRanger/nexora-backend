import { Module } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { USERS_REPOSITORY_TOKEN, USERS_SERVICE_TOKEN } from './users.tokens';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_SERVICE_TOKEN,
      useExisting: UsersService,
    },
    {
      provide: USERS_REPOSITORY_TOKEN,
      useClass: UsersRepository,
    },
  ],
  exports: [UsersService, USERS_SERVICE_TOKEN, USERS_REPOSITORY_TOKEN],
})
export class UsersModule {}
