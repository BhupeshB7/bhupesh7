import type { MetadataRoute } from "next";
import { SITE } from "@/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.legalName} Portfolio`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#07080f",
    theme_color: "#07080f",
    lang: "en-IN",
    categories: ["portfolio", "business", "productivity"],
    icons: [
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
