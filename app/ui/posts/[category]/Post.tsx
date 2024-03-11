import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";
import BodySerializer from "@/app/class/BodySerializer";
import { fetchPostByCategoryAndId } from "@/app/lib/actions";
import { CustomMDX } from "@/app/ui/posts/[category]/CustomMDX";

import styles from "@/app/ui/styles/post.module.scss";

export default async function Post({
  category,
  id,
}: {
  category: string;
  id: string;
}) {
  const post = await fetchPostByCategoryAndId(category, id);
  if (!post) notFound();

  const { src, title, date, body } = post;
  const bodySerializer = new BodySerializer(body);
  const text = bodySerializer.text();

  return (
    <div className={clsx(styles.post, "flex flex-col w-full")}>
      <h1 className="text-3xl ml-4 my-4 self-start">{title}</h1>
      <h4 className="text-sm ml-4 self-start opacity-60">{date}</h4>
      <Image
        className="m-20 rounded-lg border-slight border-sea-200 self-center"
        src={src}
        alt="image for post"
        width={376}
        height={376 / 1.6}
      />
      <article className={styles.article}>
        <CustomMDX source={text} />
      </article>
    </div>
  );
}
