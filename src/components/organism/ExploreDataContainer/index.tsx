import { filterFormType } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import CCompanyCard from '../CCompanyCard';
import CFormFilterDynamic from '../CFormFilterDynamic';
import CFormSearchDynamic from '../CFormSearchDynamic';
import CJobCard from '../CJobCard';
import CLoadingCard from './components/CLoadingCard';

type ExploreDataContainerProps = {
  formFilter?: any;
  onSubmitFilter: (val: any) => Promise<void>;
  filterForms: filterFormType[];
  loading: boolean;
  title: string;
  subTitle: string;
  data: any[];
  type: 'job' | 'company';
};

const ExploreDataContainer: FC<ExploreDataContainerProps> = ({
  formFilter,
  onSubmitFilter,
  filterForms,
  loading,
  title,
  subTitle,
  data,
  type,
}) => {
  return (
    <>
      <div className="px-32 pt-16 pb-14">
        <div className="mb-10">
          <div className="mx-auto mb-11 text-center flex justify-center gap-2">
            <span className="text-5xl font-semibold">Find Your</span>
            <div className="relative">
              <span className="text-5xl font-semibold text-primary">
                {title}
              </span>
              <div className="absolute top-10 w-[220px] h-10">
                <Image
                  src="/images/pattern2.png"
                  alt="/images/pattern2.png"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500">{subTitle}</div>
        </div>
        <div>
          <CFormSearchDynamic
            formFilter={formFilter}
            onSubmitFilter={onSubmitFilter}
          />
        </div>
      </div>

      <div className="mt-20 mb-16 px-32 flex flex-row items-start gap-10">
        <div className="w-1/5">
          <CFormFilterDynamic
            formFilter={formFilter}
            onSubmitFilter={onSubmitFilter}
            filterForms={filterForms}
          />
        </div>
        <div className="w-4/5">
          <div className="mb-8">
            <div className="text-3xl font-semibold">
              All {type === 'job' ? 'Jobs' : 'Companies'}
            </div>
            <div className="text-muted-foreground">
              Showing {data.length} Result
            </div>

            <div>
              {loading ? (
                <CLoadingCard />
              ) : (
                <div className="grid grid-cols-1 gap-7">
                  {type === 'job' ? (
                    <>
                      {data?.map((item: any, i: number) => (
                        <CJobCard key={i} {...item} />
                      ))}
                    </>
                  ) : (
                    <div className="grid grid-cols-3 gap-5">
                      {data?.map((item: any, i: number) => (
                        <CCompanyCard key={i} {...item} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreDataContainer;
