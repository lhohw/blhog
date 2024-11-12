"use client";

import { memo } from "react";
import Image from "next/image";
import Section from "@/components/molecules/Section";
import Resizer from "@/components/atoms/Resizer";
import usePostImages from "./usePostImages";

export default function PostSidebarImagesSection() {
  const { images, maxHeight } = usePostImages();

  return (
    <>
      <Resizer
        className="hidden md:block"
        initialLength={200}
        min={200}
        max={maxHeight}
        direction="top"
      >
        <ImagesSection images={images} />
      </Resizer>
    </>
  );
}

// eslint-disable-next-line react/display-name
const ImagesSection = memo(({ images }: { images: HTMLImageElement[] }) => {
  return (
    <Section
      title="IMAGE"
      titleClassName="text-xs md:text-xs pb-1"
      className="h-full"
    >
      <ul
        id="post-images-list"
        className="my-2 w-full h-full overflow-y-scroll snap-y snap-mandatory"
      >
        {images.map((img, idx) => {
          const { width, height } = getComputedStyle(img);
          const { src, alt, title } = img;

          return (
            <li key={idx} className="h-full w-full snap-center">
              <Image
                className="h-full w-full object-contain"
                data-src={src}
                width={parseInt(width)}
                height={parseInt(height)}
                src={src}
                alt={alt}
                title={title}
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
});
