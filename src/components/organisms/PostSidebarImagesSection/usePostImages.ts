"use client";

import { useState } from "react";

export type PostImage = {
  src: string;
  alt: string;
  title?: string;
  offsetTop: number;
};
const usePostImages = () => {
  const [images, setImages] = useState<PostImage[]>([]);
  const [maxHeight, setMaxHeight] = useState(100);

  return {
    images,
    setImages,
    maxHeight,
    setMaxHeight,
  };
};

export default usePostImages;
