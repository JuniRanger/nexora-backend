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
import { IClientsService } from '../../domain/contracts/interfaces/clients.service.interface';
import { CLIENTS_SERVICE_TOKEN } from '../../clients.tokens';
import { CreateClientRequestDto } from '../dto/requests/create-client.request';
import { UpdateClientRequestDto } from '../dto/requests/update-client.request';
import { ClientResponseDto } from '../dto/responses/client.response';

@Controller('clients')
export class ClientsController {
  constructor(
    @Inject(CLIENTS_SERVICE_TOKEN)
    private readonly clientsService: IClientsService,
  ) {}

  @Post()
  create(@Body() dto: CreateClientRequestDto): Promise<ClientResponseDto> {
    return this.clientsService.create(dto);
  }

  @Get()
  findAll(): Promise<ClientResponseDto[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ClientResponseDto> {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientRequestDto,
  ): Promise<ClientResponseDto> {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.clientsService.remove(id);
    return { message: 'Client soft deleted successfully' };
  }
}
