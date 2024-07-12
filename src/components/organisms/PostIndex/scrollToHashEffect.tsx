"use client";

import { useEffect } from "react";
import { FOLDED_SIDEBAR_SIZE_UNDER_MD } from "@/const/size";

export default function ScrollToHashEffect() {
  useEffect(() => {
    const { hash } = location;
    if (!hash) return;

    const target = document.querySelectorAll(hash)?.[1] as HTMLHeadingElement;
    if (target) {
      const { offsetTop } = target;
      window.scrollTo({
        top: offsetTop - FOLDED_SIDEBAR_SIZE_UNDER_MD,
        behavior: "smooth",
      });
    }
  }, []);

  return <></>;
}
