"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/components/molecules/Section";
import Resizer from "@/components/atoms/Resizer";
import PostImageEffect from "@/components/effects/PostImageEffect";
import usePostImageContext from "@/hooks/react/usePostImageContext";

export default function PostSidebarImagesSection() {
  const { images } = usePostImageContext();
  const [max, setMax] = useState(100);

  return (
    <>
      <Resizer initialLength={100} min={100} max={max} direction="top">
        <Section
          title="IMAGE"
          titleClassName="text-xs md:text-xs pb-1"
          className="h-full"
        >
          <ul className="my-2 w-full h-full overflow-y-scroll snap-y snap-mandatory">
            {images.map((img, idx) => (
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
            ))}
          </ul>
        </Section>
      </Resizer>
      <PostImageEffect setMax={setMax} />
    </>
  );
}
