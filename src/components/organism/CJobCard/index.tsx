import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { JobType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface JobCardProps extends JobType {}

const CJobCard: FC<JobCardProps> = ({
  applicants,
  skills,
  image,
  jobType,
  location,
  name,
  needs,
  type,
  id,
}) => {
  const route = useRouter();

  return (
    <div
      onClick={() => route.push('detail/job/' + id)}
      className="w-full p-6 ring-1 ring-gray-900/5 shadow-xl bg-white/30 backdrop-blur-xl flex flex-row justify-between items-center mt-5 cursor-pointer rounded-md"
    >
      <div className="flex flex-row items-start gap-6">
        <div>
          <Image src={image} alt={image} width={64} height={64} />
        </div>
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground mb-2">
            {type} . {location}
          </div>
          <div className="h-5 inline-flex gap-2 items-center">
            <Badge variant="secondary">{jobType}</Badge>
            <Separator orientation="vertical" />
            {skills.map((item: string, i: number) => (
              <Badge key={i}>{item}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[200px]">
        <Button className="w-full" size="lg">
          Apply
        </Button>
        <Progress value={(applicants / needs) * 100} className="mt-2" />
        <div className="text-gray-500 text-sm text-center mt-2">
          <span className="text-black font-semibold">{applicants} applied</span>{' '}
          of {needs} capacity
        </div>
      </div>
    </div>
  );
};

export default CJobCard;
