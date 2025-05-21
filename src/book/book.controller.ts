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
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.bookService.remove(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookData: Partial<Book>,
  ): Promise<Book> {
    return this.bookService.update(id, bookData);
  }

  @Get('bookByAuthor/:id')
  async getBookByAuthor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<number[]> {
    return await this.bookService.getAllBooksOfAuthor(id);
  }
}
