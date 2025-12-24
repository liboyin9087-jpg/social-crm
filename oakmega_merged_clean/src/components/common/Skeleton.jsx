import React from 'react';

export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClass = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]";
  const variantClass = variant === 'circle' ? 'rounded-full' : 'rounded-xl';
  return <div className={`${baseClass} ${variantClass} ${className}`} />;
};

export const SkeletonCard = () => (
  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" className="w-14 h-14" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array(count).fill(0).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

export const SkeletonDashboard = () => (
  <div className="px-6 pt-12 space-y-6">
    <Skeleton className="h-44 w-full rounded-[32px]" />
    <div className="flex gap-3 overflow-hidden">
      <Skeleton className="h-8 w-40 rounded-full flex-shrink-0" />
      <Skeleton className="h-8 w-36 rounded-full flex-shrink-0" />
      <Skeleton className="h-8 w-44 rounded-full flex-shrink-0" />
    </div>
    <Skeleton className="h-5 w-24" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-32 rounded-[24px]" />
      <Skeleton className="h-32 rounded-[24px]" />
      <Skeleton className="h-32 rounded-[24px]" />
      <Skeleton className="h-32 rounded-[24px]" />
    </div>
  </div>
);

export const SkeletonCoupons = () => (
  <div className="flex gap-4 overflow-hidden pl-6">
    <Skeleton className="w-64 h-36 rounded-[24px] flex-shrink-0" />
    <Skeleton className="w-64 h-36 rounded-[24px] flex-shrink-0" />
    <Skeleton className="w-64 h-36 rounded-[24px] flex-shrink-0" />
  </div>
);
