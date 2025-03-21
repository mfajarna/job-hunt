import { Skeleton } from '@/components/ui/skeleton';

const CLoadingCard = () => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div className="w-full mt-12" key={item}>
          <div className="flex flex-row">
            <Skeleton className="h-[150px] w-full rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CLoadingCard;
