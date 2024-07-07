import Link from "next/link";
import Section from "@/components/molecules/Section";
import PostsLinkSectionCanvas from "./PostsLinkSectionCanvas";

export default function PostsLinkSection() {
  return (
    <Link href="/posts">
      <Section title="Posts">
        <PostsLinkSectionCanvas />
      </Section>
    </Link>
  );
}
