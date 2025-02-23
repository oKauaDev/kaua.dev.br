// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  base: "/",
  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    svg: true,
  },

  integrations: [
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
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
