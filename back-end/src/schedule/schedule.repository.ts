import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Schedule } from '@prisma/client';

@Injectable()
export class ScheduleRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany();
  }

  async updateSchedule(
    updated: { dayOfWeek: number; startTime: string; endTime: string }[],
  ) {
    for (const item of updated) {
      await this.prisma.schedule.upsert({
        where: { dayOfWeek: item.dayOfWeek },
        create: {
          dayOfWeek: item.dayOfWeek,
          startTime: item.startTime,
          endTime: item.endTime,
        },
        update: {
          startTime: item.startTime,
          endTime: item.endTime,
        },
      });
    }
    return this.getAll();
  }

  async checkAccess(dayOfWeek: number, time: string): Promise<boolean> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { dayOfWeek },
    });

    if (!schedule) {
      return false;
    }

    const { startTime, endTime } = schedule;

    if (startTime < endTime) {
      return startTime <= time && time < endTime;
    }

    return time >= startTime || time < endTime;
  }
}
