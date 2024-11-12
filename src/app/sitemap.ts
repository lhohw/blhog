import type { MetadataRoute } from "next";

const BASE_URL = "https://blhog.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const directories = [
    "React",
    "Browser",
    "JavaScript",
    "computer-science",
    "TypeScript",
    "performance",
  ];
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/graphic`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...directories.map(
      (dirName) =>
        ({
          url: `${BASE_URL}/posts/${dirName}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        }) as MetadataRoute.Sitemap[number],
    ),
  ];
}
