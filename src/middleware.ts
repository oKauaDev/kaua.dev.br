import { defineMiddleware } from "astro/middleware";
import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = defineMiddleware(
  async ({ request, redirect }, next) => {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const userLang = request.headers.get("accept-language")?.split(",")[0].split("-")[0];
      const supportedLangs: string[] = ["pt", "en", "es", "fr"];
      const defaultLocale: string = "pt";

      const targetLang: string = supportedLangs.includes(userLang ?? "")
        ? userLang!
        : defaultLocale;

      return redirect(`/${targetLang}`, 302);
    }

    return next();
  }
);
