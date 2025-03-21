'use client';

import { CSkeletonLoading } from '@/components/atoms/CSkeletonLoading';
import CTitleSection from '@/components/atoms/CTitleSection';
import useFeaturedJobs from '@/hooks/useFeaturedJobs';
import CJobItem from './CJobItem';

const CFeaturedJobs = () => {
  const { jobs, isLoading } = useFeaturedJobs();

  return (
    <div className="mt-32 mb-10" data-aos="fade-in">
      <CTitleSection word1="Featured" word2="jobs" />

      {!isLoading ? (
        <div className="grid grid-cols-4 gap-8 mt-12">
          {jobs.length > 0 ? (
            jobs.map((item, index) => <CJobItem key={item.id} {...item} />)
          ) : (
            <div className="text-md font-semibold">
              Featured jobs is not available
            </div>
          )}
        </div>
      ) : (
        <CSkeletonLoading />
      )}
    </div>
  );
};

export default CFeaturedJobs;
