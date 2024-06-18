"use client";

import { useCallback } from "react";
import Script from "next/script";

export default function GoogleAnalytics() {
  const onLoad = useCallback(() => {
    const gaWindow = window as typeof window & { dataLayer: any[]; gtag: any };
    gaWindow.dataLayer = gaWindow.dataLayer || [];
    gaWindow.gtag = function () {
      gaWindow.dataLayer.push(arguments);
    };

    const { gtag } = gaWindow;
    gtag("js", new Date());
    gtag("config", "G-S72WF3ZJF0");
  }, []);

  return (
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-S72WF3ZJF0"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
}
