import { Badge } from '@/components/ui/badge';
import { CompanyType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CCompanyCardProps extends CompanyType {}

const CCompanyCard: React.FC<CCompanyCardProps> = ({
  industry,
  description,
  image,
  name,
  totalJobs,
  id,
}) => {
  const router = useRouter();

  return (
    <div
      className="ring-1 ring-gray-900/5 shadow-xl rounded-lg bg-white/30 backdrop-blur-xl p-6 mt-4 cursor-pointer"
      onClick={() => router.push('/detail/company/' + id)}
    >
      <div className="flex flex-row justify-between items-start">
        <Image src={image} alt={image} width={66} height={66} />

        <Badge>{totalJobs} Jobs</Badge>
      </div>

      <div className="my-4">
        <div className="text-lg font-semibold mb-2">{name}</div>
        <div
          className="line-clamp-3 text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>

      <div className="space-x-2">
        <Badge variant={'outline'}>{industry}</Badge>
      </div>
    </div>
  );
};

export default CCompanyCard;
