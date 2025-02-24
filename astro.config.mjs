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
