import {
  Controller,
  Body,
  Post,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    //parsing to int as params from http request are always string
    return this.usersService.findOne(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(+id, userData);
  }

  @Get(':email')
  async getByEmail(@Param('email') email: string): Promise<User | undefined> {
    return await this.usersService.findByEmail(email);
  }

  @Get('userReviews/:id')
  async getUserReviews(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Record<number, string>> {
    const reviewsMap = await this.usersService.getUserReviews(id);

    //Convert Map<number, string> to a plain object for proper JSON serialization
    const result: Record<number, string> = {};
    reviewsMap.forEach((text, bookId) => {
      result[bookId] = text;
    });
    return result;
  }
}
