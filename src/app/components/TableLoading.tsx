import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function TableLoading() {
  return (
    <div>
      <Skeleton className="w-full h-[30px]" />
      <div className="flex flex-col gap-1 mt-2">
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
      </div>
    </div>
  );
}
