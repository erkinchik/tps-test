import { IsArray, IsInt, IsString, Min, Max } from 'class-validator';

class ScheduleItemDto {
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

export class UpdateScheduleDto {
  @IsArray()
  schedule: ScheduleItemDto[];
}
