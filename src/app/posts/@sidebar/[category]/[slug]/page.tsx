import Section from "@/components/molecules/Section";

export default function PostSidebar() {
  return (
    <div className="flex flex-col w-full z-10 transition-height duration-300 delay-100 relative top-0 left-0 bg-background md:h-full md:static md:bg-background-alpha md:border-r-slight md:border-primary md:pr-2">
      <div className="flex flex-col h-full m-4">
        <Section className="flex-1 mb-4">section1</Section>
        <Section className="flex-1">section2</Section>
      </div>
    </div>
  );
}
