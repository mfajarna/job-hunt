import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rolesParams = searchParams.get('roles');

  const filterCategory =
    searchParams.get('category') !== ''
      ? searchParams.get('category')?.split(',')
      : [];

  const categoryQuery: Prisma.JobWhereInput =
    filterCategory && filterCategory.length > 0
      ? {
          CategoryJob: {
            id: {
              in: filterCategory,
            },
          },
        }
      : {};

  const jobs = await prisma.job.findMany({
    where: {
      ...categoryQuery,
      roles: {
        contains: rolesParams ?? '',
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
