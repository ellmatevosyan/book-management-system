import {
  Controller,
  Body,
  Post,
  ParseIntPipe,
  Get,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './create-ticket.dto';
import { Ticket } from './ticket.entity';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('register')
  async create(@Body() createticketDto: CreateTicketDto): Promise<Ticket> {
    return await this.ticketService.create(createticketDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.ticketService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() ticketData: Partial<Ticket>,
  ): Promise<Ticket> {
    return this.ticketService.update(id, ticketData);
  }
}
