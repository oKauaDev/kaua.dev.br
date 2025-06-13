import aboutCount from "@/utils/aboutCount";
import formatNumber from "@/utils/formatNumber";
import { getTranslations } from "next-intl/server";
import React from "react";

export const dynamic = "force-dynamic";

export default async function AboutCount() {
  const t = await getTranslations("AboutPage");
  const views = await aboutCount();

  return (
    <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-4 max-md:mt-2">
      {formatNumber(views)} {t("views")}
    </p>
  );
}
