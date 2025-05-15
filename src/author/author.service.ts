import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create({
      name: createAuthorDto.name,
      nationality: createAuthorDto.nationality,
    });
    return this.authorRepository.save(author);
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOneBy({ id });

    if (!author) {
      throw new NotFoundException(`The author with ${id} id is not found.`);
    }
    return author;
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }

  async update(id: number, authorData: Partial<Author>): Promise<Author> {
    await this.authorRepository.update(+id, authorData);
    const updatedAuthor = await this.findOne(+id);

    if (!updatedAuthor) {
      throw new NotFoundException(`The author with ${id} id is not found.`);
    }
    return updatedAuthor;
  }
}
