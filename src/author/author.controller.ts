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
  UseGuards,
} from '@nestjs/common';
import { CreateAuthorDto } from './create-author.dto';
import { AuthorService } from './author.service';
import { Author } from './author.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('')
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(204) //Content not found
  remove(@Param('id') id: number): Promise<void> {
    return this.authorService.remove(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorData: Partial<Author>,
  ): Promise<Author> {
    return this.authorService.update(id, authorData);
  }
}
