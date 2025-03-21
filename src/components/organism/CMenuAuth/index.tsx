import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiLogOut, BiSolidDownArrow, BiUserPin } from 'react-icons/bi';

type CMenuAuthProps = {};

const CMenuAuth: React.FC<CMenuAuthProps> = ({}) => {
  const { data: session } = useSession();
  const nav = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex items-center gap-1 cursor-pointer">
          <div className="font-medium text-primary">
            Hai, {session?.user.name}
          </div>

          <BiSolidDownArrow className="text-lg" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className=" font-semibold"
          onClick={() => nav.push('/user')}
        >
          <BiUserPin className="mr-2" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-500 font-semibold"
        >
          <BiLogOut className="mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CMenuAuth;
