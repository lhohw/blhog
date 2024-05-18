import clsx from "clsx";
import Image from "next/image";

export type PhotoProps = {
  url: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  user_link: string;
  user_name: string;
  className?: string;
  ratio?: "auto" | "video" | "square";
};
export default function Photo({
  url,
  alt,
  width,
  height,
  title,
  user_link,
  user_name,
  className,
  ratio = "video",
}: PhotoProps) {
  return (
    <div
      className={clsx(
        "w-full rounded mb-4 flex flex-col items-end",
        ratio === "auto"
          ? "aspect-auto"
          : ratio === "video"
            ? "aspect-video"
            : "aspect-square",
        className,
      )}
    >
      <Image
        className="rounded w-full h-full object-cover"
        src={url}
        alt={alt}
        title={title || user_link}
        width={width}
        height={height}
      />
      <span className="text-[12px] text-opacity-80 mt-2">
        photo by: {user_name}
      </span>
    </div>
  );
}
