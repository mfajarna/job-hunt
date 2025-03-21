import { fetcher, parsingCategoriesToOptions } from '@/lib/utils';
import { filterFormType } from '@/types';
import React from 'react';
import useSWR from 'swr';

const useCategoryJobFilter = () => {
  const { data, error, isLoading } = useSWR('/api/job/categories', fetcher);

  const categories = React.useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error),
    [data, error, isLoading]
  );

  const filters = React.useMemo(() => {
    return [
      {
        name: 'categories',
        label: 'Categories',
        items: categories,
      },
    ] as filterFormType[];
  }, [categories]);

  return {
    filters,
  };
};

export default useCategoryJobFilter;
