"use client";

import { useCallback, useMemo } from "react";
import Script from "next/script";

export default function GoogleAnalytics() {
  const isProduction = useMemo(() => process.env.NODE_ENV === "production", []);

  const onLoad = useCallback(() => {
    if (!isProduction) return;

    const gaWindow = window as typeof window & { dataLayer: any[]; gtag: any };
    gaWindow.dataLayer = gaWindow.dataLayer || [];
    gaWindow.gtag = function () {
      gaWindow.dataLayer.push(arguments);
    };

    const { gtag } = gaWindow;
    gtag("js", new Date());
    gtag("config", "G-S72WF3ZJF0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isProduction) return null;
  return (
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-S72WF3ZJF0"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
}
