import { Book } from 'src/book/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Book, (book) => book.release)
  @JoinColumn()
  book: Book;
}
