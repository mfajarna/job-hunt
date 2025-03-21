'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CHero = () => {
  const nav = useRouter();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center py-8 px-4 pt-4 lg:px-16 relative">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0" data-aos="fade-up">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-600 w-max">
          Discover <br /> more than <br /> {''}
          <span className="transition-colors bg-gradient-to-br from-blue-500/30 via-blue-500/90 to-blue-500/90 bg-clip-text text-transparent">
            5000+ Jobs{' '}
          </span>
        </div>

        <Image
          src="/images/pattern2.png"
          alt="images"
          width={455}
          height={32}
          className="mb-5"
        />

        <div className="text-md sm:text-lg mt-2 text-muted-foreground">
          Great platform for the job seeker that searching for <br />
          new career heights and passionate about startups
        </div>

        <div className="py-5">
          <Button
            className="h-15 text-md rounded-lg bg-gradient-to-br from-blue-500/90 via-blue-700/30 to-blue-500/90"
            onClick={() => nav.push('/find-jobs')}
          >
            Search for jobs now
          </Button>
        </div>
      </div>

      <div
        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        data-aos="fade-left"
      >
        <Image
          src="/images/hero.png"
          alt="images"
          width={550}
          height={710}
          objectFit="contain"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default CHero;
