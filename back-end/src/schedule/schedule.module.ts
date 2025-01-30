import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaModule } from '../database/prisma.module';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [PrismaModule],
  providers: [ScheduleService, ScheduleRepository],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
