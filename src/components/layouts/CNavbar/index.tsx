'use client';

import CMenuAuth from '@/components/organism/CMenuAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { HiBars3 } from 'react-icons/hi2';

type CNavbarProps = {};

const CNavbar: FC<CNavbarProps> = ({}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  const navigation = useRouter();
  const pathName = usePathname();

  // get session data
  const { data: session } = useSession();

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 relative"
      >
        <div className="flex lg:flex-1">
          <div className="lg:hidden mr-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <div className="sr-only">Open Main Menu</div>
              <HiBars3
                aria-hidden="true"
                className="justify-center items-center"
                size={30}
              />
            </button>
          </div>

          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Job Huntly</span>
            <Image src="/images/logo2.png" alt="logo" width={140} height={36} />
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            className={cn(
              'text-sm/6 font-semibold text-gray-900 border-transparent transition-all duration-600 hover:text-primary hover:border-b-2 border-b-primary px-2',
              {
                'text-primary border-b-2 border-b-primary':
                  pathName === '/find-jobs',
              }
            )}
            href={'/find-jobs'}
          >
            Find Jobs
          </Link>
          <Link
            className={cn(
              'text-sm/6 font-semibold text-gray-900 border-transparent transition-all duration-600 hover:text-primary hover:border-b-2 border-b-primary px-2',
              {
                'text-primary border-b-2 border-b-primary':
                  pathName === '/find-companies',
              }
            )}
            href={'/find-companies'}
          >
            Browse Company
          </Link>
          {/* <Link
            className="text-sm/6 font-semibold text-gray-900 border-transparent transition-all duration-600 hover:text-primary hover:border-b-2 border-b-primary px-2"
            href={'#latest-job'}
          >
            Latest Jobs
          </Link> */}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          {session ? (
            <CMenuAuth />
          ) : (
            <>
              <Button
                variant={'link'}
                onClick={() => navigation.push('/signin')}
              >
                Login
              </Button>
              <Separator orientation="vertical" />
              <Button
                className="rounded-none"
                onClick={() => navigation.push('/signup')}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default CNavbar;
