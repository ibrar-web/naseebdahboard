import { Skeleton } from '@/components/ui/Skeleton';

export const PageSkeleton = () => (
  <div className="space-y-6">
    <div className="rounded-[28px] bg-white p-6 shadow-panel">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="mt-4 h-10 w-80 max-w-full" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-2/3" />
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-[28px] bg-white p-6 shadow-panel">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-10 w-28" />
          <Skeleton className="mt-4 h-4 w-32" />
        </div>
      ))}
    </div>

    <div className="rounded-[28px] bg-white p-6 shadow-panel">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-4 h-8 w-64" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    </div>
  </div>
);
