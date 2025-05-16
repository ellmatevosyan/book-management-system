import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Release } from './release.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReleaseDto } from './create.release.dto';
@Injectable()
export class ReleaseService {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>,
  ) {}

  async create(createReleaseDto: CreateReleaseDto): Promise<Release> {
    const release = this.releaseRepository.create({
      startDate: createReleaseDto.startDate,
      address: createReleaseDto.address,
      book: { id: createReleaseDto.bookId },
      availableTickets: createReleaseDto.availableTickets,
    });
    return this.releaseRepository.save(release);
  }

  async findOne(id: number): Promise<Release> {
    const release = await this.releaseRepository.findOneBy({ id });
    if (!release) {
      throw new NotFoundException(`The Release with ${id} is not found.`);
    }
    return release;
  }

  async findAll(): Promise<Release[]> {
    return await this.releaseRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.releaseRepository.delete(id);
  }

  async update(id: number, releaseData: Partial<Release>): Promise<Release> {
    await this.releaseRepository.update(id, releaseData);
    const updatedRelease = await this.findOne(id);
    if (!updatedRelease) {
      throw new NotFoundException(`The Release with ${id} is not found.`);
    }
    return updatedRelease;
  }
}
