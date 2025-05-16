import { Release } from 'src/release/release.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Release, (release) => release.tickets)
  release: Release;

  @OneToOne(() => User, (user) => user.ticket)
  @JoinColumn()
  user: User;
}
