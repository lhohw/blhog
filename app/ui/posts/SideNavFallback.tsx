import styles from "@/app/ui/styles/util.module.css";
import clsx from "clsx";

export default async function SideNavFallback() {
  return (
    <div
      className={clsx(
        "flex flex-col flex-1 h-full min-w-[295px] max-w-[393px] bg-darkgray rounded-tr-2xl border-slight border-sea-200 relative",
        styles.fallback
      )}
    ></div>
  );
}
