import { IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  text: string;

  @IsNumber()
  stars: number;

  @IsNumber()
  userId: number;
}
