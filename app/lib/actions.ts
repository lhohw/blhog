import { links, posts } from "./mockup";
// import { sql } from '@vercel/postgres';
// import { unstable_noStore as noStore } from 'next/cache';

export async function fetchDirectoryNames() {
  try {
    await delay(3000);
    return Promise.resolve(links);
  } catch (error) {
    throw new Error("Failed to fetch directory names.");
  }
}
export async function fetchLatestPosts() {
  try {
    await delay(3000);
    return Promise.resolve(posts.map(({ title, src }) => ({ title, src })));
  } catch (error) {
    throw new Error("Failed to fetch latest posts");
  }
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
