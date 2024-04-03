import type { Post } from "@/app/const/definitions";
import Image from "next/image";
import Link from "next/link";

export default async function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-[816px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-2 gap-2">
      {posts.map((props) => (
        <PostItem key={props.title} {...props} />
      ))}
    </div>
  );
}

function PostItem({ title, category, slug, photo_url, alt }: Post) {
  const href = `/posts/${category}/${slug}`;
  return (
    <Link href={href}>
      <div className="relative flex min-w-20 min-h-20 justify-center text-center items-end border-slight border-sea-200 cursor-pointer rounded-lg aspect-square">
        <Image
          className="w-full h-full object-cover rounded-lg"
          width={194}
          height={194}
          alt={alt}
          src={photo_url}
        />
        <span className="px-2 absolute font-bold text-lg bottom-4 text-[hsl(var(--color-hs),100%)]">
          {title}
        </span>
      </div>
    </Link>
  );
}
