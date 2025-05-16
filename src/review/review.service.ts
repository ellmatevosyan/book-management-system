import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create({
      text: createReviewDto.text,
      stars: createReviewDto.stars,
      user: { id: createReviewDto.userId },
      book: { id: createReviewDto.bookId },
    });
    return this.reviewRepository.save(review);
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`The review which ${id} id is not found.`);
    }
    return review;
  }

  async findAll(): Promise<Review[]> {
    const reviews = await this.reviewRepository.find();
    return reviews;
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }

  async update(id: number, reviewData: Partial<Review>): Promise<Review> {
    await this.reviewRepository.update(+id, reviewData);
    const updatedReview = await this.findOne(+id);
    if (!updatedReview) {
      throw new NotFoundException(`The review which ${id} id is not found.`);
    }
    return updatedReview;
  }

  async averageStarsForBook(bookId: number): Promise<number> {
    try {
      const averageStars = await this.reviewRepository
        .createQueryBuilder('review')
        .select('AVG(review.stars)', 'avg')
        .where('review.bookId = :bookId', { bookId })
        .getRawOne();
      return +averageStars.avg!;
    } catch (err) {
      console.log(err);
      return 0;
    }
    
  }


}
