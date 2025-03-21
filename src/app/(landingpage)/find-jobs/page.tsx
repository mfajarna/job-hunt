'use client';

import ExploreDataContainer from '@/components/organism/ExploreDataContainer';
import useCategoryJobFilter from '@/hooks/useCategoryJobFilter';
import useJobs from '@/hooks/useJobs';
import { formFilterSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TFormSchema = z.infer<typeof formFilterSchema>;

export default function FindJobsPage() {
  const { filters } = useCategoryJobFilter();
  const [categories, setCategories] = React.useState<{
    categories: string[];
    roles: string;
  }>({
    categories: [],
    roles: '',
  });

  const { jobs, isLoading, mutate } = useJobs(categories);

  const formFilter = useForm<TFormSchema>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
      roles: '',
    },
  });

  const onSubmit = async (val: TFormSchema) => {
    setCategories(val);
  };

  React.useEffect(() => {
    mutate();
  }, [categories]);

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmit}
      filterForms={filters}
      title="Dream Job"
      subTitle="Find your next career at companies Google, Facebook and Dropbox"
      loading={isLoading}
      data={jobs}
      type="job"
    />
  );
}
