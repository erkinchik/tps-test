import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSchedule() {
  console.log('Запуск `scheduleSeed.ts`...');

  const existingSchedule = await prisma.schedule.findMany();
  if (existingSchedule.length === 0) {
    const scheduleData = Array.from({ length: 7 }, (_, i) => ({
      dayOfWeek: i + 1,
      startTime: '00:00',
      endTime: '24:00',
    }));

    await prisma.schedule.createMany({ data: scheduleData });
    console.log('Расписание создано!');
  } else {
    console.log('Расписание уже существует.');
  }
}

seedSchedule()
  .catch((e) => {
    console.error('Ошибка при выполнении `scheduleSeed.ts`:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
