import Tabnews from "@/components/icons/Tabnews";
import { markdownToHtml } from "@/lib/markdown";
import formatNumber from "@/utils/formatNumber";
import getTabnewsPostInfo from "@/utils/getTabnewsPostInfo";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostViewer({ params }: PageProps) {
  const t = await getTranslations("TabnewsPostPage");

  const post = await getTabnewsPostInfo((await params).id);

  if (!post) {
    notFound();
  }

  const dateLong = new Date(post.published_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const dateShort = new Date(post.published_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const actualDate = new Date();
  const diff = actualDate.getTime() - new Date(post.published_at).getTime();
  const diffMonths = Math.ceil(diff / (1000 * 60 * 60 * 24 * 30));
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.ceil(diff / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diff / (1000 * 60));

  let timeDiff = "";

  if (diffMonths > 1) {
    timeDiff = `${t("a")} ${diffMonths} ${t("months")}`;
  } else if (diffMonths === 1) {
    timeDiff = `${t("a")} ${diffMonths} ${t("month")}`;
  } else if (diffDays > 1) {
    timeDiff = `${t("a")} ${diffDays} ${t("days")}`;
  } else if (diffDays === 1) {
    timeDiff = `${t("a")} ${diffDays} ${t("day")}`;
  } else if (diffHour > 1) {
    timeDiff = `${t("a")} ${diffHour} ${t("hours")}`;
  } else if (diffHour === 1) {
    timeDiff = `${t("a")} ${diffHour} ${t("hour")}`;
  } else if (diffMinutes > 1) {
    timeDiff = `${t("a")} ${diffMinutes} ${t("minutes")}`;
  } else if (diffMinutes === 1) {
    timeDiff = `${t("ago")}`;
  }

  const content = await markdownToHtml(post.body);

  return (
    <>
      <section className="mt-10">
        <h1 className="text-2xl leading-9 text-black dark:text-white">{post.title}</h1>
        <div className="flex items-center justify-between max-md:block">
          <div className="flex items-center gap-3  mt-2">
            <div className="text-neutral-700 dark:text-neutral-400">
              <Tabnews />
            </div>
            <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-4">oKauaDev</p>
            <span className="block w-[1px] h-full min-h-[16px] bg-neutral-700 dark:bg-neutral-400"></span>
            <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-4 max-md:hidden">
              {dateLong} ({timeDiff})
            </p>
            <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-4 hidden max-md:block">
              {dateShort} ({timeDiff})
            </p>
          </div>

          <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-4 max-md:mt-2">
            {formatNumber(post.tabcoins)} {t("likes")}
          </p>
        </div>
      </section>

      <main>
        <div
          className="mt-10 prose prose-img:rounded-[8px] max-w-full dark:prose-invert w-full"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </main>
    </>
  );
}
