import { Controller, Get, Put, Body } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  getSchedule() {
    return this.scheduleService.getSchedule();
  }

  @Put()
  updateSchedule(@Body() dto: UpdateScheduleDto) {
    return this.scheduleService.updateSchedule(dto);
  }

  @Get('access')
  checkAccess() {
    return this.scheduleService.checkAccessNow();
  }
}
