import { Post } from "@/app/const/definitions";
import Image from "next/image";
import Link from "next/link";

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
    <div className="p-4 min-w-40 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <Link
        href={href}
        className="p-4 block border-slight border-sea-200 rounded-lg bg-darkgray hover:bg-dark transition-colors duration-300"
      >
        <div className="w-full aspect-video rounded mb-4 flex flex-col items-end">
          <Image
            className="rounded w-full h-full object-cover"
            src={photo_url}
            alt={alt}
            title={user_link}
            width={320}
            height={200}
          />
          <span className="text-[12px] text-opacity-80 mt-2">
            photo by: {user_name}
          </span>
        </div>
        <div className="mt-2 py-2">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider mb-4">
              {category}
            </div>
            <div className="font-bold leading-snug">
              <span>{title}</span>
            </div>
            <div className="mt-2 text-sm opacity-70">
              {updated_at.toLocaleDateString()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
