import { ForbiddenException, Injectable } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import dayjs = require('dayjs');

@Injectable()
export class ScheduleService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async getSchedule() {
    return this.scheduleRepository.getAll();
  }

  async updateSchedule(dto: UpdateScheduleDto) {
    return this.scheduleRepository.updateSchedule(dto.schedule);
  }

  async checkAccessNow(): Promise<{ access: boolean }> {
    let dayOfWeek: number = dayjs().day();
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    const now = dayjs().format('HH:mm');

    const hasAccess = await this.scheduleRepository.checkAccess(dayOfWeek, now);

    if (!hasAccess) {
      throw new ForbiddenException('Доступ запрещён в текущее время.');
    }

    return { access: true };
  }
}
