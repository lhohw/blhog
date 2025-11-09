import type { MetadataRoute } from 'next';
import type { Post } from '@/const/definitions';
import { sql } from '@/lib/api/sql';
 
const BASE_URL = "https://blhog.vercel.app";
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sql`SELECT slug, category, updated_at FROM posts` as Post[];
  const latest = new Date(Math.max(...posts.map(p => p.updated_at.getTime())) ?? 0);
  const categories = Array.from(new Set(posts.map(p => p.category)));

  const sitemap: MetadataRoute.Sitemap = [
     {
       url: BASE_URL,
      lastModified: latest,
      changeFrequency: 'monthly',
       priority: 0.5,
     },
     {
       url: `${BASE_URL}/posts`,
      lastModified: latest,
      changeFrequency: 'weekly',
       priority: 0.8,
     },
    ...categories.map(category => {
      const catLatest = posts
        .filter(p => p.category === category)
        .reduce((max: Date, p) => {
          const d = new Date(p.updated_at);
          return d > max ? d : max;
        }, new Date(0));
      return {
        url: `${BASE_URL}/posts/${category}`,
        lastModified: catLatest,
        changeFrequency: 'monthly',
        priority: 0.8,
      } as MetadataRoute.Sitemap[number];
    }),
   ];

  return sitemap;
 }