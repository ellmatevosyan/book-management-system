import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateReleaseDto {
  @IsDateString()
  startDate: Date;

  @IsString()
  address: string;

  @IsNumber()
  bookId: number;
}
