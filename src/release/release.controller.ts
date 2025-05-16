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
} from '@nestjs/common';
import { ReleaseService } from './release.service';
import { Release } from './release.entity';
import { CreateReleaseDto } from './create.release.dto';

@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @Post('register')
  async create(@Body() createReleaseDto: CreateReleaseDto): Promise<Release> {
    return await this.releaseService.create(createReleaseDto);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Release> {
    return this.releaseService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Release[]> {
    return await this.releaseService.findAll();
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.releaseService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() releaseData: Partial<Release>,
  ): Promise<Release> {
    return await this.releaseService.update(id, releaseData);
  }
}
