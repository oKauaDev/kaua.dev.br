import "./globals.css";
import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kauã Braz",
  description:
    "Desenvolvedor Full-Stack Freelancer de Minas Gerais com 5+ anos transformando ideias em aplicações web completas e ultrarrápidas. Especialista em Next.js, Astro, Node.js e APIs REST. Entrego projetos que unem performance técnica e design impactante.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${lexendDeca.variable} antialiased bg-neutral-50 dark:bg-neutral-950 px-[20.94vw] py-20 max-md:px-[5vw] max-md:py-6 min-h-screen`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
