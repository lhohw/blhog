import { Post } from "./definitions";
import { links, posts } from "./mockup";
import { strToSlug } from "./utils";
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
    return Promise.resolve(
      posts.map(({ title, src, category }) => ({
        title,
        src,
        href: `/posts/${category}/${strToSlug(title)}`,
      }))
    );
  } catch (error) {
    throw new Error("Failed to fetch latest posts");
  }
}

export async function fetchPostsByKey(key: string) {
  try {
    await delay(3000);
    return Promise.resolve(
      posts
        .filter(({ category }) => category === key)
        .map(({ title, src, category }) => ({
          title,
          src,
          href: `/posts/${category}/${strToSlug(title)}`,
        }))
    );
  } catch (error) {
    throw new Error("Failed to fetch posts by " + key);
  }
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
