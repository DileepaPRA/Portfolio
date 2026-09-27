import type { MetadataRoute } from "next";
import { PERSONAL_INFO } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = PERSONAL_INFO.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: [
          "*",
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
