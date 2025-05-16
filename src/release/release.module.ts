import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Release } from './release.entity';
import { ReleaseController } from './release.controller';
import { ReleaseService } from './release.service';

@Module({
  imports: [TypeOrmModule.forFeature([Release])],
  controllers: [ReleaseController],
  providers: [ReleaseService],
  exports: [],
})
export class ReleaseModule {}
