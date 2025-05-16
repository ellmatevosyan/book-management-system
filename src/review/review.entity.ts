import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  stars: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;




}
