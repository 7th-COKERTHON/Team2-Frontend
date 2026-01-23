import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "찔릿 - 습관 관리",
    short_name: "찔릿",
    description: "찌리릿",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/zzillit-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/zzillit-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/zzillit-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
