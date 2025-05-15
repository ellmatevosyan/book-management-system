import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Delete,
  ParseIntPipe,
  Param,
  HttpCode,
} from '@nestjs/common';
import { CreateAuthorDto } from './create-author.dto';
import { AuthorService } from './author.service';
import { Author } from './author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('register')
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Delete(':id')
  @HttpCode(204) //Content not found
  remove(@Param('id') id: number): Promise<void> {
    return this.authorService.remove(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorData: Partial<Author>,
  ): Promise<Author> {
    return this.authorService.update(id, authorData);
  }
}
