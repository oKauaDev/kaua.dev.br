"use client";

import { Skeleton } from "@/components/ui/skeleton";
import formatNumber from "@/utils/formatNumber";
import { useTranslations } from "next-intl";
import React from "react";

export default function AboutCount() {
  const t = useTranslations("AboutPage");
  const [views, setViews] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch("/api/about/count")
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, []);

  if (views === null) {
    return <Skeleton className="w-[64px] h-[16px]" />;
  }

  return (
    <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-4 max-md:mt-2">
      {formatNumber(views)} {t("views")}
    </p>
  );
}
