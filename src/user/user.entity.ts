import { Review } from 'src/review/review.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToOne(() => Ticket, (ticket) => ticket.user)
  ticket: Ticket;
}
