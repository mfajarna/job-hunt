import { fetcher, parsingCompanies } from '@/lib/utils';
import { JobType } from '@/types';
import React from 'react';
import useSWR from 'swr';

const COMPANY_PATH = '/api/company/filter';

const useCompanies = (filter?: string[]) => {
  const paramsCategory = React.useMemo(() => {
    if (filter && filter.length > 0) {
      return filter.join(',');
    }

    return '';
  }, [filter]);

  const { data, error, isLoading, mutate } = useSWR(
    `${COMPANY_PATH}?category=${paramsCategory}`,
    fetcher,
    { revalidateOnMount: false }
  );

  const [companies, setCompanies] = React.useState<JobType[]>([]);

  const parseJobs = React.useCallback(async () => {
    const parseData = await parsingCompanies(data, isLoading, error);
    setCompanies(parseData);
  }, [data, isLoading, error]);

  React.useEffect(() => {
    parseJobs();
  }, [data, isLoading, error]);

  return {
    companies,
    mutate,
    isLoading,
  };
};

export default useCompanies;
