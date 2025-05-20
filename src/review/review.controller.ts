import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Get,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Review } from './review.entity';
import { CreateReviewDto } from './create-review.dto';
import { ReviewService } from './review.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('')
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.reviewService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reviewData: Partial<Review>,
  ): Promise<Review> {
    return await this.reviewService.update(id, reviewData);
  }

  @Get('average/:id')
  async getAvgStars(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return await this.reviewService.averageStarsForBook(id);
  }
}
