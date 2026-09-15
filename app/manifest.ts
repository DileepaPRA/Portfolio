import type { MetadataRoute } from "next";
import { PERSONAL_INFO } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSONAL_INFO.name} — Software Engineer`,
    short_name: PERSONAL_INFO.name,
    description: PERSONAL_INFO.bio,
    start_url: "/",
    display: "standalone",
    background_color: "#060c1a",
    theme_color: "#060c1a",
    icons: [
      {
        src: "/images/favicon.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
      {
        src: "/images/logo_no_bg.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
