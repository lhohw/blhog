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
    return Promise.resolve(
      posts.map(({ id, title, src, category }) => ({
        title,
        src,
        href: `/posts/${category}/${id}`,
      })),
    );
  } catch (error) {
    throw new Error("Failed to fetch latest posts");
  }
}

export async function fetchPostsByCategory(category: string) {
  try {
    await delay(3000);
    return Promise.resolve(
      posts
        .filter((post) => post.category === category)
        .map(({ id, title, src }) => ({
          title,
          src,
          href: `/posts/${category}?id=${id}`,
        })),
    );
  } catch (error) {
    throw new Error("Failed to fetch posts by " + category);
  }
}

export async function fetchPostByCategoryAndId(category: string, id: string) {
  try {
    await delay(3000);
    return Promise.resolve(
      posts.find((post) => post.category === category && post.id === id),
    );
  } catch (error) {
    throw new Error(
      `Failed to fetch post by category: ${category} | id: ${id}`,
    );
  }
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
