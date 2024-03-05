import type { Post } from "@/app/lib/definitions";
import { fetchLatestPosts } from "@/app/lib/actions";

export default async function Posts() {
  const latestPosts = await fetchLatestPosts();
  return (
    <div className="w-full max-w-[808px] grid grid-cols-2 lg:grid-cols-4 p-2 gap-2 border-slight border-sea-200">
      {latestPosts.map(({ title, src }) => (
        <PostItem key={title} title={title} src={src} />
      ))}
    </div>
  );
}

function PostItem({ title, src }: Pick<Post, "title" | "src">) {
  return (
    <div
      className="relative flex min-w-20 min-h-20 justify-center text-center items-end pb-4 border-slight border-sea-200 cursor-pointer rounded-lg aspect-square"
      style={{
        background: `no-repeat bottom/100% url(${src}), #00000023`,
        backgroundBlendMode: "darken",
        backgroundSize: "cover",
      }}
    >
      <span className="font-bold text-lg bottom-4 text-white">{title}</span>
    </div>
  );
}
