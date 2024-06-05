import type { Post } from "@/const/definitions";
import Card from "@/components/molecules/Card";

export default async function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-wrap justify-around">
      {posts.map((props) => {
        const href = `/posts/${props.category}/${props.slug}`;
        return <Card key={props.id} href={href} {...props} />;
      })}
    </div>
  );
}
