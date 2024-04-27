"use server";

import { Post } from "@/app/const/definitions";
import DBPool from "@/app/class/DBClient";
import { withImageSize } from "@/app/lib/utils";

export async function fetchDirectoryNames(): Promise<Pick<Post, "category">[]> {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Pick<Post, "category">>(
      `SELECT DISTINCT category FROM posts`,
    );
    return res.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch directory names.");
  }
}
export async function fetchLatestPosts(): Promise<Post[]> {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Post>(`
      SELECT *
        FROM posts
        ORDER BY posts.updated_at DESC
        LIMIT 12
    `);
    const latestPosts = res.rows;
    return latestPosts.map((post) => ({
      ...post,
      photo_url: withImageSize(post.photo_url, 640, 400),
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch latest posts");
  }
}

export async function fetchPostsByCategory(category: string) {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Post>({
      text: `SELECT *
        FROM posts
        WHERE category=$1
        ORDER BY posts.updated_at DESC`,
      values: [category],
    });
    const posts = res.rows;
    return posts.map((post) => ({
      ...post,
      photo_url: withImageSize(post.photo_url, 640, 400),
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts by " + category);
  }
}

export async function fetchPostByCategoryAndSlug(
  category: string,
  slug: string,
): Promise<Post | null> {
  try {
    const client = await DBPool.getInstance();
    const res = await client.query<Post>({
      text: `SELECT * FROM posts
        WHERE category=$1 AND slug=$2`,
      values: [category, slug],
    });

    const post = res.rows[0] || null;
    return post;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to fetch post by category: ${category} | slug: ${slug}`,
    );
  }
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
