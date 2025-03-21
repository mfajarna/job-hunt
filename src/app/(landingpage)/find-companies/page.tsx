'use client';

import ExploreDataContainer from '@/components/organism/ExploreDataContainer';
import useCategoryCompanyFilter from '@/hooks/useCategoryCompanyFilter';
import useCompanies from '@/hooks/useCompanies';
import { formFilterCompanySchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FindCompaniesPageProps = {};

type TFormType = z.infer<typeof formFilterCompanySchema>;

const FindCompaniesPage: FC<FindCompaniesPageProps> = ({}) => {
  const [categories, setCategories] = React.useState<string[]>([]);

  const formFilter = useForm<TFormType>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
    },
  });

  const { filters } = useCategoryCompanyFilter();

  const { companies, isLoading, mutate } = useCompanies(categories);

  const onSubmitFormFilter = async (val: TFormType) => {
    setCategories(val.industry);
  };

  React.useEffect(() => {
    mutate();
  }, [categories]);

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={filters}
      title="Dream Companies"
      subTitle="Find the dream companies you dream work for"
      loading={isLoading}
      type="company"
      data={companies}
    />
  );
};

export default FindCompaniesPage;
