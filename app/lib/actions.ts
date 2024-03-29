"use server";

import { Post } from "@/app/const/definitions";
import DBPool from "@/app/class/DBClient";
import { PostItemProps } from "../ui/posts/Posts";
import { withImageSize } from "./utils";

// import { sql } from '@vercel/postgres';
// import { unstable_noStore as noStore } from 'next/cache';

export async function fetchDirectoryNames(): Promise<Pick<Post, "category">[]> {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Pick<Post, "category">>(
      `SELECT DISTINCT category FROM posts`,
    );
    return res.rows;
  } catch (error) {
    throw new Error("Failed to fetch directory names.");
  }
}
export async function fetchLatestPosts(): Promise<PostItemProps[]> {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Post>(`
      SELECT title, id, photo_url, category
        FROM posts
        ORDER BY posts.updated_at DESC
        LIMIT 12
    `);
    const latestPosts = res.rows;
    return latestPosts.map(({ id, title, photo_url, category }) => ({
      title,
      photo_url: withImageSize(photo_url, 320, "auto"),
      href: `/posts/${category}?id=${id}`,
    }));
  } catch (error) {
    throw new Error("Failed to fetch latest posts");
  }
}

export async function fetchPostsByCategory(category: string) {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Post>({
      text: `SELECT title, id, photo_url, category
        FROM posts
        WHERE category=$1`,
      values: [category],
    });
    const posts = res.rows;
    return posts
      .filter((post) => post.category === category)
      .map(({ id, title, photo_url }) => ({
        title,
        photo_url: withImageSize(photo_url, 320),
        href: `/posts/${category}?id=${id}`,
      }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts by " + category);
  }
}

export async function fetchPostByCategoryAndId(
  category: string,
  id: string,
): Promise<Post | null> {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Post>({
      text: `SELECT * FROM posts
        WHERE category=$1 AND id=$2`,
      values: [category, id],
    });

    const post = res.rows[0] || null;
    return post;
  } catch (error) {
    throw new Error(
      `Failed to fetch post by category: ${category} | id: ${id}`,
    );
  }
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
