import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { JobType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface CLatestJobsItemProps extends JobType {}

const CLatestJobsItem: FC<CLatestJobsItemProps> = ({
  id,
  category,
  desc,
  image,
  jobType,
  location,
  name,
  type,
  skills,
}) => {
  const nav = useRouter();

  return (
    <div
      className="ring-1 ring-gray-900/5 shadow-xl bg-white/30 rounded-lg p-8 flex flex-row items-start gap-6 cursor-pointer"
      onClick={() => nav.push(`/detail/job/${id}`)}
    >
      <div>
        <Image src={image} alt={image} width={64} height={64} />
      </div>
      <div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground mb-2">
          {type} . {location}
        </div>

        <div className="h-5 inline-flex gap-2 items-center">
          <Badge variant={'secondary'}>{jobType}</Badge>
          <Separator orientation="vertical" />

          {skills.map((item: string, i: number) => (
            <Badge
              variant={'outline'}
              className="rounded border-primary bg-primary/5 text-primary"
              key={i}
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CLatestJobsItem;
