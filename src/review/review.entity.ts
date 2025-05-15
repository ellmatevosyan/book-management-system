import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/user/user.entity';

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
}
