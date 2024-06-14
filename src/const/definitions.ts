import { z } from "zod";

export const Heading = z.object({
  tagName: z.string(),
  textContent: z.string(),
});
export type Heading = z.infer<typeof Heading>;

export const Post = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  slug: z.string(),
  title: z.string(),
  body: z.instanceof(Uint8Array),
  category: z.string(),
  photo_id: z.string(),
  photo_url: z.string(),
  user_name: z.string(),
  user_link: z.string(),
  alt: z.string(),
  blur_hash: z.string(),
  headings: z.array(Heading),
});
export type Post = z.infer<typeof Post>;

export const Link = z.object({
  category: z.string(),
});
export type Link = z.infer<typeof Link>;
