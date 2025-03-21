import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

type TCbannerSignup = {};

const CBannerSignUp: React.FC<TCbannerSignup> = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mt-32 mb-10 bg-gradient-to-br from-blue-500/30 via-blue-500/90 to-blue-500/30 text-primary-foreground px-16 pt-16 flex flex-row justify-between items-start rounded-sm"
    >
      <div>
        <div className="text-5xl font-semibold">
          Start posting <br /> jobs today
        </div>

        <div className="my-6">Start postring job for only $10</div>

        <Button
          size={'lg'}
          variant={'secondary'}
          className="hover:text-primary"
        >
          Sign Up for Free
        </Button>
      </div>
      <div>
        <Image src="/images/dashboard.png" alt="alt" width={500} height={300} />
      </div>
    </div>
  );
};

export default CBannerSignUp;
