'use client';

import { CSkeletonLoading } from '@/components/atoms/CSkeletonLoading';
import CTitleSection from '@/components/atoms/CTitleSection';
import { useCategory } from '@/hooks/useCategory';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import CCategoryItem from './CCategoryItem';

type CCategoryProps = {};

const CCategory: FC<CCategoryProps> = ({}) => {
  const { category, isLoading } = useCategory();
  const nav = useRouter();

  return (
    <div className="mt-32 mb-8" data-aos="fade-in">
      <CTitleSection word1="Explore by" word2="Category" />

      {!isLoading ? (
        <div className="grid grid-cols-5 gap-9 mt-12">
          {category.length > 0 ? (
            category.map((item, index) => (
              <CCategoryItem
                key={item.id}
                name={item.name}
                totalJobs={item.totalJobs}
                onPress={() => nav.push('/find-jobs')}
              />
            ))
          ) : (
            <div className="text-md font-semibold">
              Category jobs is not available.
            </div>
          )}
        </div>
      ) : (
        <CSkeletonLoading />
      )}
    </div>
  );
};

export default CCategory;
