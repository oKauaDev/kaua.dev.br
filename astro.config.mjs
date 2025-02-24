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

  redirects: {
    "/github": "https://github.com/oKauaDev",
    "/gdev": "https://g.dev/kaua",
    "/whatsapp": "https://wa.me/+553298619211",
    "/workana": "https://www.workana.com/freelancer/3b613107ca3c66457ca81125f5f6be85",
  },
});
