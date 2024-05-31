import LinkListWrapper from "@/components/atoms/wrapper/LinkListWrapper";
import ShimmerBar from "@/components/atoms/ShimmerBar";

export default function SideNavSkeleton() {
  return (
    <LinkListWrapper className="flex-none md:h-full min-h-14 bg-background-alpha md:bg-background md:relative">
      <div className="max-md:shimmer border-slight border-primary before:rounded-tr-2xl h-full flex flex-col">
        <ul className="hidden md:flex md:flex-col md:h-full md:mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ShimmerBar key={i} className="h-10 my-2 mx-4" />
          ))}
        </ul>
      </div>
    </LinkListWrapper>
  );
}
