import type { Post } from "@/app/const/definitions";
import Link from "next/link";

export default async function Posts({ posts }: { posts: PostItemProps[] }) {
  return (
    <div className="w-full max-w-[808px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2 gap-2 border-slight border-sea-200">
      {posts.map((props) => (
        <PostItem key={props.title} {...props} />
      ))}
    </div>
  );
}

export type PostItemProps = Pick<Post, "title" | "photo_url"> & {
  href: string;
};
function PostItem({ title, photo_url, href }: PostItemProps) {
  return (
    <Link href={href}>
      <div
        className="relative flex min-w-20 min-h-20 justify-center text-center items-end pb-4 border-slight border-sea-200 cursor-pointer rounded-lg aspect-square"
        style={{
          background: `no-repeat bottom/100% url(${photo_url}), #00000023`,
          backgroundBlendMode: "darken",
          backgroundSize: "cover",
        }}
      >
        <span className="font-bold text-lg bottom-4 text-white">{title}</span>
      </div>
    </Link>
  );
}
