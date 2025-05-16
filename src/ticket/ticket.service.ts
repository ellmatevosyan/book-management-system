import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create({
      user: { id: createTicketDto.userId },
      release: { id: createTicketDto.releaseId },
    });
    return await this.ticketRepository.save(ticket);
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`The ticket with ${id} is not found.`);
    }
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }

  async update(id: number, ticketData: Partial<Ticket>): Promise<Ticket> {
    await this.ticketRepository.update(id, ticketData);
    const updatedTicket = await this.findOne(id);
    if (!updatedTicket) {
      throw new NotFoundException(`The ticket with ${id} is not found.`);
    }
    return updatedTicket;
  }
}
