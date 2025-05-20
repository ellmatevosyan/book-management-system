import { Book } from 'src/book/book.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  address: string;

  @Column()
  availableTickets: number;

  @OneToOne(() => Book, (book) => book.release)
  @JoinColumn()
  book: Book;

  @OneToMany(() => Ticket, (ticket) => ticket.release)
  tickets: Ticket[];
}
