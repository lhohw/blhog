import { notFound } from "next/navigation";
import { fetchPostByCategoryAndSlug } from "@/lib/api/post";
import { decompress, format } from "@/lib/utils/markdown";
import { CustomMDX } from "@/components/atoms/CustomMDX";
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
      <h1 className="text-4xl ml-4 my-6 text-left font-semibold main-color">
        {title}
      </h1>
      <h4 className="mr-4 text-right mb-4 text-sm">{format(updated_at)}</h4>
      <article className="prism">
        <CustomMDX source={decompressed} />
      </article>
    </>
  );
}
