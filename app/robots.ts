import type { MetadataRoute } from "next";
import { PERSONAL_INFO } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = PERSONAL_INFO.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
