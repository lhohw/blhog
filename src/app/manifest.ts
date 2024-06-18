import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blhog",
    short_name: "Blhog",
    description: "lhohw's personal blog",
    start_url: "/",
    display: "standalone",
    background_color: "#ebebeb",
    theme_color: "#6fc89a",
    icons: [
      {
        src: "/icon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
