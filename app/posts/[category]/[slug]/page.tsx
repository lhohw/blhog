import { notFound } from "next/navigation";

import { fetchPostByCategoryAndSlug } from "@/app/lib/api/post";
import { decompress, format } from "@/app/lib/utils/markdown";
import { CustomMDX } from "@/app/ui/posts/[category]/CustomMDX";

import "@/app/ui/styles/post-prism.scss";

export default async function Post({
  params,
}: PageProps<{
  category: string;
  slug: string;
}>) {
  const { category, slug } = params;
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
