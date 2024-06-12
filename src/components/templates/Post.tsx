import { notFound } from "next/navigation";
import { fetchPostByCategoryAndSlug } from "@/lib/api/post";
import { decompress, format } from "@/lib/utils/markdown";
import { CustomMDX } from "@/components/atoms/CustomMDX";
import H1 from "@/components/atoms/headings/H1";
import PostIndexEffect from "@/components/effects/PostIndexEffect";
import PostImageEffect from "@/components/effects/PostImageEffect";
import "@/styles/post-prism.scss";

export type PostProps = {
  category: string;
  slug: string;
};
export default async function Post({ category, slug }: PostProps) {
  const post = await fetchPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const { title, updated_at, body } = post;
  const decompressed = decompress(body);

  return (
    <>
      <H1 className="main-color">{title}</H1>
      <h4 className="mr-4 text-right mb-4 text-sm">{format(updated_at)}</h4>
      <article id="post-article" className="prism">
        <CustomMDX source={decompressed} />
        <PostIndexEffect />
        <PostImageEffect />
      </article>
    </>
  );
}
