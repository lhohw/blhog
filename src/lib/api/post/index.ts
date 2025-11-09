import { getSql } from "../sql";
import * as query from "./query";
import type { Post } from "@/const/definitions";
import { withImageSize } from "@/lib/utils/markdown";

export async function fetchCategories(): Promise<Pick<Post, "category">[]> {
  try {
    const sql = getSql();
    const res = await sql.query(query.fetchCategoriesQuery);
    return res as Pick<Post, "category">[];
  } catch (error) {
    throw new Error(`=== Failed to fetch directory names ===\n>> ${error}`);
  }
}
export async function fetchLatestPosts(): Promise<Post[]> {
  try {
    const sql = getSql();
    const latestPosts = await sql.query(query.fetchLatestPostsQuery) as Post[];
    return latestPosts.map((post) => ({
      ...post,
      photo_url: withImageSize(post.photo_url, 640, 400),
    }));
  } catch (error) {
    throw new Error(`=== Failed to fetch latest posts ===\n>> ${error}`);
  }
}

export async function fetchPostsByCategory(category: string) {
  try {
    const sql = getSql();
    const posts = await sql.query(query.fetchPostsByCategoryQuery, [category]) as Post[];
    return posts.map((post) => ({
      ...post,
      photo_url: withImageSize(post.photo_url, 640, 400),
    }));
  } catch (error) {
    throw new Error(`=== Failed to fetch posts by ${category} ===\n>> ${error}`);
  }
}

export async function fetchPostByCategoryAndSlug(
  category: string,
  slug: string,
): Promise<Post | null> {
  try {
    const sql = getSql();
    const post = (await sql.query(query.fetchPostByCategoryAndSlugQuery, [category, slug]))?.[0] ?? null;
    return post as Post | null;
  } catch (error) {
    throw new Error(
      `=== Failed to fetch post by category: ${category} | slug: ${slug} ===\n>> ${error}`,
    );
  }
}
