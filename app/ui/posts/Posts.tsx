import type { Post } from "@/app/const/definitions";
import Card from "@/app/ui/posts/Card";

export default async function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-wrap">
      {posts.map((props) => {
        const href = `/posts/${props.category}/${props.slug}`;
        return <Card key={props.id} href={href} {...props} />;
      })}
    </div>
  );
}
