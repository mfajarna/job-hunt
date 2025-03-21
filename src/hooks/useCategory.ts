'use client';

import { getJobCategories } from '@/lib/http';
import { parsingCategories } from '@/lib/utils';
import { categoryJobType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const useCategory = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Get Data Job Categories'],
    queryFn: async () => {
      const result = await getJobCategories();

      return result;
    },
  });

  const [category, setCategory] = React.useState<categoryJobType[]>([]);

  const categories = React.useCallback(async () => {
    const parsing = await parsingCategories(data, isLoading, error);

    setCategory(parsing);
    return parsing;
  }, [data, isLoading, error]);

  React.useEffect(() => {
    categories();
  }, [data, isLoading, error]);

  return {
    category,
    isLoading,
    error,
  };
};
