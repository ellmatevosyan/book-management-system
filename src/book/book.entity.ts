import { Author } from 'src/author/author.entity';
import { Review } from 'src/review/review.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @ManyToMany(() => Author)
  @JoinTable()
  authors: Author[];
}
