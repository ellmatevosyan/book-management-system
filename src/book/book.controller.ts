import {
  Controller,
  Body,
  Post,
  ParseIntPipe,
  Param,
  Get,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('register')
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.create(createBookDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.bookService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookData: Partial<Book>,
  ): Promise<Book> {
    return this.bookService.update(id, bookData);
  }
}
