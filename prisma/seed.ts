import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: 'lajdfklahfauig',
    role: 'USER',
    todos: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          isCompleted: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: '78632bkehaso9id',
    role: 'MEMBER',
    todos: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: 'lnafsi7z3ihbnawldk',
    role: 'ADMIN',
    todos: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          isCompleted: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
];

async function main() {
  console.log('Start seeding...');
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
