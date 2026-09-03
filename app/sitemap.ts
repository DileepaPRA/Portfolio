import type { MetadataRoute } from "next";
import { PERSONAL_INFO } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PERSONAL_INFO.siteUrl.replace(/\/$/, "");

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
