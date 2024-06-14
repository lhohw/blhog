import clsx from "clsx";
import "@/styles/post-prism.scss";
import styles from "@/styles/post.module.scss";
import { CustomMDX } from "@/components/atoms/CustomMDX";
import H1 from "@/components/atoms/headings/H1";

export type PostProps = {
  title: string;
  updated_at: string;
  decompressed: string;
};
export default function Post({ title, updated_at, decompressed }: PostProps) {
  return (
    <div className={clsx("w-full", styles.post)}>
      <H1 className="main-color">{title}</H1>
      <h4 className="mr-4 text-right mb-4 text-sm">{updated_at}</h4>
      <article id="post-article" className="prism">
        <CustomMDX source={decompressed} />
      </article>
    </div>
  );
}
