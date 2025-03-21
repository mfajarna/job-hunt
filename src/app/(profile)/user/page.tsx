import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { USER_HISTORY_APPLY_COLUMNS } from '@/constants';
import prisma from '@/lib/prisma';
import { dateFormat } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';

type TUserPage = {};

const getApplicantHistory = async () => {
  const user = await getServerSession(authOptions);

  const history = prisma.applicant.findMany({
    where: {
      userId: user?.user.id,
    },
    include: {
      job: {
        include: {
          Company: true,
        },
      },
    },
  });

  return history;
};

const UserPage: React.FC<TUserPage> = async ({}) => {
  const user = await getServerSession(authOptions);
  const userHistory = await getApplicantHistory();

  return (
    <div>
      <div className="w-full px-24 py-10 bg-blue-950 h-[250px] rounded-xl text-white shadow-xl">
        <div className="mb-5">Your information account, </div>
        <div className="text-3xl font-medium mb-5">{user?.user.name}</div>

        <div className="text-lg inline-flex items-center gap-2">
          <MdOutlineEmail />
          {user?.user.email}
        </div>
      </div>

      <div className=" px-[200px] mt-10">
        <div className="text-[25px] font-medium">History Apply Job</div>

        <div className="mt-4">
          <Table>
            <TableCaption>A list of all job submitted.</TableCaption>

            <TableHeader>
              <TableRow>
                {USER_HISTORY_APPLY_COLUMNS.map(
                  (item: string, index: number) => (
                    <TableHead key={index} className="text-center">
                      {item}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {userHistory && (
                <>
                  {userHistory.map((item, index) => (
                    <TableRow key={index} className="text-center">
                      <TableCell>{item.job?.roles}</TableCell>
                      <TableCell>{item.job?.Company?.name}</TableCell>
                      <TableCell>{item.statusApply}</TableCell>
                      <TableCell>
                        {dateFormat(`${item.job?.dueDate}`)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
