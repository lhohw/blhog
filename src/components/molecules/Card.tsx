import Link from "next/link";
import { Post } from "@/const/definitions";
import { format } from "@/lib/utils/markdown";
import Photo from "@/components/atoms/Photo";

export default function Card({
  photo_url,
  updated_at,
  alt,
  title,
  category,
  href,
  user_link,
  user_name,
}: Post & { href: string }) {
  return (
    <div className="p-4 min-w-40 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mix-blend-unset">
      <Link
        href={href}
        className="p-4 block border-slight border-primary rounded-lg transition-shadow hover:shadow-corona-primary"
      >
        <Photo
          url={photo_url}
          alt={alt}
          title={user_link}
          user_link={user_link}
          user_name={user_name}
          width={320}
          height={200}
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
    </div>
  );
}
