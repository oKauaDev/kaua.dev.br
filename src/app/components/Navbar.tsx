import TabnewsNavbar from "@/components/icons/TabnewsNavbar";
import XNavbar from "@/components/icons/XNavbar";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeButton from "./ThemeButton";

export default async function Navbar() {
  const t = await getTranslations("NavbarComponent");

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-neutral-950 dark:text-neutral-100 font-medium text-xl">
        Kauã Braz
      </Link>

      <div className="flex items-center gap-5 max-md:gap-1">
        <ThemeButton />
        <Link
          href="/about"
          className="leading-6 text-neutral-800 dark:text-neutral-300 py-2 px-4 rounded transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
        >
          {t("about")}
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="https://x.com/oKauaDev"
              aria-label="Meu perfil no X"
              className="p-2 rounded transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer text-neutral-800 dark:text-neutral-300"
            >
              <XNavbar />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("tooltip_x")}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="https://www.tabnews.com.br/kauadev"
              aria-label="Meu perfil no Tabnews"
              className="p-2 rounded transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer text-neutral-800 dark:text-neutral-300"
            >
              <TabnewsNavbar />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("tooltip_tabnews")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}
