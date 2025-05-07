// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  base: "/",
  site: "https://kaua.dev.br",
  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: ["pt", "en", "es", "fr"],
    defaultLocale: "pt",
    routing: {
      prefixDefaultLocale: true,
    },
  },

  experimental: {
    svg: true,
  },

  integrations: [
    mdx(),
    sitemap({
      customPages: ["https://kaua.dev.br"],
      changefreq: "weekly",
      priority: 1,
      lastmod: new Date("2025-02-23"),
      i18n: {
        defaultLocale: "pt",
        locales: {
          pt: "pt-BR",
          en: "en-US",
          es: "es-ES",
          fr: "fr-FR",
        },
      },
    }),
  ],

  adapter: vercel({
    skewProtection: true,
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    isr: {
      expiration: 60 * 60 * 24,
    },
  }),
});
