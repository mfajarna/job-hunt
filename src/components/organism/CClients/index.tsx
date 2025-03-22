'use client';

import CTitleSection from '@/components/atoms/CTitleSection';
import Image from 'next/image';
import { FC } from 'react';
import Marquee from 'react-fast-marquee';

type CClientsProps = {};

const clients = [
  '/images/jobox.png',
  '/images/dsign.png',
  '/images/wave.png',
  '/images/twins.png',
  '/images/bubles.png',
];

const CClients: FC<CClientsProps> = ({}) => {
  return (
    <div className="relative z-10 pt-10">
      <CTitleSection word1="Companies we" word2="helped grow" />

      <div className="overflow-x-hidden mt-12">
        {/* <div className={cn('flex flex-row justify-between')}>

        </div> */}
        <Marquee pauseOnHover>
          {clients.map((item: string, i: number) => (
            <Image
              key={i}
              src={item}
              alt={item}
              width={139}
              height={35}
              className="mr-20"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default CClients;
