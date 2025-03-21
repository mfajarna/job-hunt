import { fetcher, parsingJobs } from '@/lib/utils';
import { JobType } from '@/types';
import React from 'react';
import useSWR from 'swr';

const JOB_PATH = '/api/job/filter';

const useJobs = (filter?: { categories: string[]; roles: string }) => {
  const paramsCategory = React.useMemo(() => {
    if (filter?.categories && filter?.categories.length > 0) {
      return filter.categories.join(',');
    }

    return '';
  }, [filter?.categories]);

  const { data, error, isLoading, mutate } = useSWR(
    `${JOB_PATH}?category=${paramsCategory}&roles=${filter?.roles}`,
    fetcher,
    { revalidateOnMount: false }
  );

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
    mutate,
    isLoading,
  };
};

export default useJobs;
