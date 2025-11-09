"use server";

import { sql } from "../sql";
import * as query from "./query";
import type { Post } from "@/const/definitions";
import { withImageSize } from "@/lib/utils/markdown";

export async function fetchCategories(): Promise<Pick<Post, "category">[]> {
  try {
    const res = await sql.query(query.fetchCategoriesQuery);
    return res as Pick<Post, "category">[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch directory names.");
  }
}
export async function fetchLatestPosts(): Promise<Post[]> {
  try {
    const latestPosts = await sql.query(query.fetchLatestPostsQuery) as Post[];
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
    const posts = await sql.query(query.fetchPostsByCategoryQuery, [category]) as Post[];
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
    const post = (await sql.query(query.fetchPostByCategoryAndSlugQuery, [category, slug]))?.[0] ?? null;
    return post as Post | null;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to fetch post by category: ${category} | slug: ${slug}`,
    );
  }
}
