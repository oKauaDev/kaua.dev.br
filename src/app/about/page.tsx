import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { markdownToHtml } from "@/lib/markdown";
import { getTranslations } from "next-intl/server";
import React from "react";
import AboutCount from "./AboutCount";

const DATE = 1749747079157;

const md = `
  Um desenvolvedor full-stack freelancer de Minas Gerais que transforma café ☕ em código e ideias em soluções digitais ultrarrápidas e impactantes. Com mais de 5 anos de experiência, já criei de tudo: desde interfaces que encantam até sistemas complexos que rodam nos bastidores. E sim, faço isso tudo enquanto exploro montanhas (ou pelo menos planejo a próxima aventura)!

Sou o arquiteto por trás de aplicações web completas, do front-end ao back-end. Minhas ferramentas favoritas?

*   Next.js e Astro JS para interfaces velozes e modernas
*   Node.js e Express para back-ends robustos e escaláveis
*   APIs REST que integram tudo como um quebra-cabeça perfeito

Trabalho como freelancer, entregando projetos que não só funcionam, mas se destacam no mercado.

![Paisagem de montanhas com céu nublado](/paisagem.jpg)

"Gosto de escalar e explorar lugares no meu tempo livre."

Alguns cases que mostram como eu misturo código + criatividade:

1.  **SapiencIA**: Desenvolvi uma plataforma em Next.js em apenas 2 meses, focando em uma experiência de usuário tão intuitiva que até sua avó usaria!
2.  **Luxfy**: Criei uma solução completa (front + back) com Next.js e Node.js puro em 1 mês - performance máxima, sem enrolação
3.  **Halvo**: Integrei front-end e back-end usando APIs REST, garantindo que o sistema cresça sem travar, mesmo sob demanda alta

Quando não estou programando, você me encontra:

*   Escalando montanhas (ou subindo escadas de prédios altos pra ver a vista)
*   🍣 Aprendendo algo novo (sim, até como fazer sushi... porque por que não?)

Se você quer um desenvolvedor full-stack que entrega projetos rápidos, eficientes e com um toque de "uau, como ele fez isso?", é só me chamar!
`;

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
  const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));

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

  const content = await markdownToHtml(md);

  return (
    <>
      <Navbar />
      <section className="mt-10">
        <h1 className="text-2xl leading-9 text-black dark:text-white">{t("title")}</h1>
        <div className="flex items-center justify-between max-md:block">
          <div className="flex items-center gap-3  mt-2">
            <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-4">kaua.dev.br</p>
            <span className="block w-[1px] h-full min-h-[16px] bg-zinc-700 dark:bg-zinc-400"></span>
            <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-4 max-md:hidden">
              {dateLong} ({timeDiff})
            </p>
            <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-4 max-md:block">
              {dateShort} ({timeDiff})
            </p>
          </div>

          <AboutCount />
        </div>
      </section>

      <main>
        <div
          className="mt-10 prose prose-img:rounded-[8px] max-w-full dark:prose-invert w-full"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
