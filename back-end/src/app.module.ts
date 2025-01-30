import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [AuthModule, ScheduleModule],
  providers: [PrismaService],
})
export class AppModule {}
