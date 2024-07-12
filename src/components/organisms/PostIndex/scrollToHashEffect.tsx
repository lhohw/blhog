"use client";

import { useEffect } from "react";
import { FOLDED_SIDEBAR_SIZE_UNDER_MD } from "@/const/size";
import { getAllHeadingsInPost } from "@/lib/utils/dom";

export default function ScrollToHashEffect() {
  useEffect(() => {
    let { hash } = location;
    if (!hash) return;

    hash = hash.substring(1);
    hash = decodeURIComponent(hash);

    const target = getAllHeadingsInPost().find((heading) =>
      heading.id.match(hash),
    );

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
