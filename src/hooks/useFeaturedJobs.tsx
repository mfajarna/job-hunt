'use client';

import { getJobFeatured } from '@/lib/http';
import { parsingJobs } from '@/lib/utils';
import { JobType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useFeaturedJobs = () => {
  // const { data, isLoading, error } = useSWR('/api/job/featured', fetcher);
  const { data, isLoading, error } = useQuery({
    queryKey: ['Get Job Feature'],
    queryFn: async () => {
      const result = await getJobFeatured();

      return result;
    },
  });

  const [jobs, setJobs] = React.useState<JobType[]>([]);

  const parseJobs = React.useCallback(async () => {
    const parseData = await parsingJobs(data, isLoading, error);
    setJobs(parseData);
  }, [data, isLoading, error]);

  React.useEffect(() => {
    parseJobs();
  }, [data, isLoading, error]);

  return {
    jobs,
    isLoading,
    error,
  };
};

export default useFeaturedJobs;
