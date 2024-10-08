import type { Post } from "@/const/definitions";
import Link from "next/link";
import { format } from "@/lib/utils/markdown";
import Photo, { PhotoProps } from "@/components/atoms/Photo";
import CardWrapper from "@/components/atoms/wrapper/CardWrapper";

export default function Card({
  photo_url,
  updated_at,
  alt,
  title,
  category,
  href,
  user_link,
  user_name,
  priority,
}: Post & { href: string; priority?: PhotoProps["priority"] }) {
  return (
    <CardWrapper>
      <Link
        href={href}
        className="p-4 block"
        aria-label={`${title} card component`}
      >
        <Photo
          url={photo_url}
          alt={alt}
          title={user_link}
          user_link={user_link}
          user_name={user_name}
          width={320}
          height={200}
          priority={priority}
        />
        <div className="mt-2 py-2">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider mb-4">
              {category}
            </div>
            <div className="font-bold leading-snug">
              <span>{title}</span>
            </div>
            <div className="mt-2 text-sm opacity-70">{format(updated_at)}</div>
          </div>
        </div>
      </Link>
    </CardWrapper>
  );
}
