import type { Post } from "@/const/definitions";
import Card from "@/components/molecules/Card";

export default async function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-wrap justify-start">
      {posts.map((props, idx) => {
        const href = `/post?category=${props.category}&slug=${props.slug}`;
        return (
          <Card key={props.id} href={href} priority={idx === 0} {...props} />
        );
      })}
    </div>
  );
}
