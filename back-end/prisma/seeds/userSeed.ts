import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUsers() {
  console.log('Запуск `userSeed.ts`...');

  const users = [
    { email: 'user1@some.com', password: 'user1@some.com' },
    { email: 'user2@some.com', password: 'user2@some.com' },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Пользователи созданы!');
}

seedUsers()
  .catch((e) => {
    console.error('Ошибка при выполнении `userSeed.ts`:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
