import type { SitemapOptions } from "@astrojs/sitemap";

const Sitemap: SitemapOptions = {
  changefreq: "weekly",
  priority: 1,
  lastmod: new Date("2024-07-21"),
  customPages: [
    "https://kaua.dev.br",
    "https://kaua.dev.br/skills",
    "https://kaua.dev.br/experience",
    "https://kaua.dev.br/links",
    "https://kaua.dev.br/discord",
    "https://kaua.dev.br/github",
  ],
};

export default Sitemap;
