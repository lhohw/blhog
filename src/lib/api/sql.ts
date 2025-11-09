import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL
  if (!url) throw new Error('Missing env: DATABASE_URL')
  return neon(url)
}

export { getSql };