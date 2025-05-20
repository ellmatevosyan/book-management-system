import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Get,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReleaseService } from './release.service';
import { Release } from './release.entity';
import { CreateReleaseDto } from './create.release.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createReleaseDto: CreateReleaseDto): Promise<Release> {
    return await this.releaseService.create(createReleaseDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Release> {
    return this.releaseService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll(): Promise<Release[]> {
    return await this.releaseService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.releaseService.remove(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() releaseData: Partial<Release>,
  ): Promise<Release> {
    return await this.releaseService.update(id, releaseData);
  }
}
