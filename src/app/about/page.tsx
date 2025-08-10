import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { markdownToHtml } from "@/lib/markdown";
import { getTranslations } from "next-intl/server";
import React from "react";
import AboutCount from "./AboutCount";
import { markdown } from "./markdown";
import VeryCurrentAge from "./VeryCurrentAge";

const DATE = 1749747079157;

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  const dateLong = new Date(DATE).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const dateShort = new Date(DATE).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const actualDate = new Date();
  const diff = actualDate.getTime() - new Date(DATE).getTime();
  const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));

  let timeDiff = "";

  if (diffYears > 1) {
    timeDiff = `${t("a")} ${diffYears} ${t("years")}`;
  } else if (diffYears === 1) {
    timeDiff = `${t("a")} ${diffYears} ${t("year")}`;
  } else if (diffMonths > 1) {
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

  const content = await markdownToHtml(markdown);

  return (
    <>
      <Navbar />
      <section className="mt-10">
        <h1 className="text-2xl leading-9 text-black dark:text-white">{t("title")}</h1>
        <div className="flex items-center justify-between max-md:block">
          <div className="flex items-center gap-3  mt-2">
            <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-4">kaua.dev.br</p>
            <span className="block w-[1px] h-full min-h-[16px] bg-neutral-700 dark:bg-neutral-400"></span>
            <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-4 max-md:hidden">
              {dateLong} ({timeDiff})
            </p>
            <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-4 hidden max-md:block">
              {dateShort} ({timeDiff})
            </p>
          </div>

          <AboutCount />
        </div>
      </section>

      <main>
        <div className="mt-10 prose prose-img:rounded-[8px] max-w-full dark:prose-invert w-full">
          <p>
            Oi! Sou o Kauã, atualmente tenho <VeryCurrentAge />.
          </p>

          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
