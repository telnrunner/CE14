import { Skeleton } from "../ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="relative h-[300px] rounded-xl overflow-hidden p-4 flex flex-col">
      {/* รูปภาพ */}
      <Skeleton className="h-3/4 w-full rounded-xl mb-3" />

      {/* title + subtitle */}
      <div className="flex flex-col gap-2 flex-grow">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* icon ด้านล่าง */}
      <div className="mt-auto flex justify-end">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default LoadingCard;
