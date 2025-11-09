import type { MetadataRoute } from 'next'
import { neon } from '@neondatabase/serverless'

// 요청 시 실행 + 캐시 비활성화
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs' // Node 런타임(HTTP 드라이버와 호환)

const BASE_URL = 'https://blhog.vercel.app'

function getSql() {
  const url = process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL
  if (!url) throw new Error('Missing env: DATABASE_URL')
  return neon(url)
}

type Row = { slug: string; category: string; updated_at: string }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sql = getSql()
  const rows = await sql`SELECT slug, category, updated_at FROM posts`

  const latestMs =
    rows.length > 0 ? Math.max(...rows.map(r => new Date(r.updated_at).getTime())) : Date.now()
  const latest = new Date(latestMs)
  const cats = Array.from(new Set(rows.map(r => r.category)))

  return [
    { url: BASE_URL, lastModified: latest, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/posts`, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    ...cats.map((c) => {
      const catLatest = new Date(
        Math.max(
          0,
          ...rows.filter(r => r.category === c).map(r => new Date(r.updated_at).getTime())
        )
      )
      return {
        url: `${BASE_URL}/posts/${c}`,
        lastModified: catLatest,
        changeFrequency: 'monthly',
        priority: 0.8,
      } as MetadataRoute.Sitemap[number]
    }),
  ]
}
