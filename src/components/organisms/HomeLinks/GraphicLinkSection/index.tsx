import Link from "next/link";
import Section from "@/components/molecules/Section";
import GraphicLinkSectionCanvas from "./GraphicLinkSectionCanvas";

export default function GraphicLinkSection() {
  return (
    <Link href="/graphic">
      <Section title="Graphic">
        <GraphicLinkSectionCanvas />
      </Section>
    </Link>
  );
}
