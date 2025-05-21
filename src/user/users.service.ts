import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { Review } from 'src/review/review.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role || 'user',
    });

    return this.userRepository.save(newUser);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id }); //here the findOne expects an object

    if (!user) {
      throw new NotFoundException(`User with ${id} id is not found. `);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    console.log(users);
    return users;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ${id} id is not found. `);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = await this.userRepository.findOneBy({ email });
    if (!userEmail) {
      throw new NotFoundException(`User with ${email} does not exist`);
    }
    return userEmail;
  }

  async getUserReviews(userId: number): Promise<Map<number, string>> {
    const userReviews = await this.reviewRepository
      .createQueryBuilder('review')
      .select(['review.bookId AS bookid', 'review.text AS text'])
      .where('review.userId=:userId', { userId })
      .getRawMany();

    const result = new Map<number, string>();
    userReviews.forEach((review) => {
      result.set(review.bookid, review.text);
    });
    return result;
  }
}
