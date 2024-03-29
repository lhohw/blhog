import { Suspense } from "react";
import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchPostByCategoryAndId } from "@/app/lib/actions";
import { CustomMDX } from "@/app/ui/posts/[category]/CustomMDX";
import CustomMDXFallback from "@/app/ui/posts/[category]/CustomMDXFallback";
import { decompress, withImageSize } from "@/app/lib/utils";

import styles from "@/app/ui/styles/post.module.scss";
import "@/app/ui/styles/post-prism.scss";

export default async function Post({
  category,
  id,
}: {
  category: string;
  id: string;
}) {
  const post = await fetchPostByCategoryAndId(category, id);
  if (!post) notFound();

  const { photo_url, title, created_at, body } = post;
  const src = withImageSize(photo_url, 376, 235);
  const decompressed = decompress(body);

  return (
    <div className={clsx("flex flex-col w-full", styles.post)}>
      <h1 className="text-3xl ml-4 my-4 self-start">{title}</h1>
      <h4 className="text-sm ml-4 self-start opacity-60">
        {created_at.toLocaleDateString()}
      </h4>
      <div className="m-20 rounded-lg border-slight border-sea-200 self-center w-[376px] h-[235px]">
        <Image
          className="w-full h-full"
          src={src}
          alt="image for post"
          width={376}
          height={235}
        />
      </div>
      <article className={clsx("prism", styles.article)}>
        <Suspense fallback={<CustomMDXFallback />}>
          <CustomMDX source={decompressed} />
        </Suspense>
      </article>
    </div>
  );
}
