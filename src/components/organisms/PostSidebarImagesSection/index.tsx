"use client";

import { memo } from "react";
import Image from "next/image";
import Section from "@/components/molecules/Section";
import Resizer from "@/components/atoms/Resizer";
import usePostImages, { type PostImage } from "./usePostImages";
import InitializePostImageEffect from "./InitializePostImageEffect";

export default function PostSidebarImagesSection() {
  const { images, setImages, maxHeight, setMaxHeight } = usePostImages();

  return (
    <>
      <Resizer
        className="hidden md:block"
        initialLength={100}
        min={100}
        max={maxHeight}
        direction="top"
      >
        <ImagesSection images={images} />
      </Resizer>
      <InitializePostImageEffect
        setImages={setImages}
        setMaxHeight={setMaxHeight}
      />
    </>
  );
}

// eslint-disable-next-line react/display-name
const ImagesSection = memo(({ images }: { images: PostImage[] }) => {
  return (
    <Section
      title="IMAGE"
      titleClassName="text-xs md:text-xs pb-1"
      className="h-full"
    >
      <ul className="my-2 w-full h-full overflow-y-scroll snap-y snap-mandatory">
        {images.map((img, idx) => {
          return (
            <li key={idx} className="h-full w-full snap-center">
              <Image
                className="h-full w-full object-contain"
                data-src={img.src}
                width={0}
                height={100}
                src={img.src}
                alt={img.alt}
                title={img.title}
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
});
