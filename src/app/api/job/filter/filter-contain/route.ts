import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const filter = searchParams.get('name');

  const jobs = await prisma.job.findMany({
    where: {
      roles: {
        contains: filter!,
        mode: 'insensitive',
      },
    },
    include: {
      CategoryJob: true,
      Company: {
        include: {
          CompanyOverview: true,
        },
      },
    },
  });

  return NextResponse.json(jobs);
}
