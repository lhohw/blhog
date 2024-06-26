"use client";

import { useCallback, useEffect, useState } from "react";
import Metaphor from "@/components/atoms/Metaphor";
import { Sun, Moon } from "@/components/icons";

type Theme = "unset" | "light" | "dark";
export default function ThemeMetaphor() {
  const [theme, setTheme] = useState<Theme>("unset");
  const [themeIcon, setThemeIcon] = useState(<Sun />);

  const getBodyTheme = useCallback(
    () => (document.body.getAttribute("data-theme") || "unset") as Theme,
    [],
  );

  const setThemeState = useCallback((theme: Theme) => {
    setTheme(theme);
    setThemeIcon(theme === "dark" ? <Moon /> : <Sun />);
  }, []);

  const onChangeTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setThemeState(nextTheme);
    document.body.setAttribute("data-theme", nextTheme);
  }, [setThemeState, theme]);

  useEffect(() => {
    const bodyTheme = getBodyTheme();
    const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const nextTheme: Theme =
      bodyTheme === "unset"
        ? themeMedia.matches
          ? "dark"
          : "light"
        : bodyTheme;
    setThemeState(nextTheme);

    const onSystemThemeChange = (e: MediaQueryListEvent) => {
      const { matches } = e;
      const bodyTheme = getBodyTheme();
      if (bodyTheme !== "unset") return;

      const nextTheme = matches ? "dark" : "light";
      setThemeState(nextTheme);
    };

    themeMedia.addEventListener("change", onSystemThemeChange);
    return () => {
      themeMedia.removeEventListener("change", onSystemThemeChange);
    };
  }, [getBodyTheme, setThemeState]);

  return (
    <Metaphor title="theme" Icon={() => themeIcon} onClick={onChangeTheme} />
  );
}
