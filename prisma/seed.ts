import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.location.createMany({
    data: dataLocation,
  });

  return result;
}

main()
  .then((res) => {
    console.log('success seed location');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const dataLocation = [
  {
    name: 'Indonesia',
  },
  {
    name: 'Singapore',
  },
];
