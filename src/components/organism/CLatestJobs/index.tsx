'use client';

import { CSkeletonLoading } from '@/components/atoms/CSkeletonLoading';
import CTitleSection from '@/components/atoms/CTitleSection';
import useFeaturedJobs from '@/hooks/useFeaturedJobs';
import CLatestJobsItem from './CLatestJobsItem';

const CLatestJobs = () => {
  const { jobs, isLoading } = useFeaturedJobs();

  return (
    <section
      id="latest-job"
      className="py-16 mt-32 mb-10 relative"
      data-aos="fade-in"
    >
      <CTitleSection word1="Latest" word2="jobs open" />

      {!isLoading ? (
        <div className="mt-12 grid grid-cols-3 gap-8">
          {jobs.length > 0 ? (
            jobs.map((item, index) => (
              <CLatestJobsItem key={item.id} {...item} />
            ))
          ) : (
            <div className="text-md font-semibold">
              Latest job is not available
            </div>
          )}
        </div>
      ) : (
        <CSkeletonLoading />
      )}
    </section>
  );
};

export default CLatestJobs;
