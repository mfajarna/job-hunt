import Link from 'next/link';
import { FC } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

type CTitleSectionProps = {
  word1: string;
  word2: string;
};

const CTitleSection: FC<CTitleSectionProps> = ({ word1, word2 }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-4xl font-bold">
        {word1}{' '}
        <span className="transition-colors bg-gradient-to-br from-blue-500/30 via-blue-500/90 to-blue-500/90 bg-clip-text text-transparent">
          {word2}
        </span>
      </div>

      <div className="text-primary font-semibold cursor-pointer">
        <Link href={'/find-jobs'} className="inline-flex gap-3 items-center t">
          <span>Show all jobs</span>
          <HiOutlineArrowNarrowRight />
        </Link>
      </div>
    </div>
  );
};

export default CTitleSection;
