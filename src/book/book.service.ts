import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.entity';
import { Author } from 'src/author/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOneBy({
      id: createBookDto.authorId,
    });
    if (!author) {
      throw new Error('Author not found.');
    }
    const book = this.bookRepository.create({
      title: createBookDto.title,
      authors: [author], //expects an array of Author entity
    });

    return this.bookRepository.save(book);
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`The book with ${id} is not found.`);
    }
    return book;
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async update(id: number, bookData: Partial<Book>): Promise<Book> {
    await this.bookRepository.update(id, bookData);
    const updatedBook = await this.findOne(id);
    if (!updatedBook) {
      throw new NotFoundException(`The book with ${id} is not found.`);
    }
    return updatedBook;
  }
}
