import { Skeleton } from '@/components/ui/skeleton';

export function CSkeletonLoading() {
  return (
    <div className="grid grid-cols-5 gap-9 mt-12">
      {[0, 1, 2, 3, 4].map((item: number) => (
        <div className="flex flex-col space-y-3" key={item}>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
