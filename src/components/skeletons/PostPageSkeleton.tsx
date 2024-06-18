import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import Section from "@/components/molecules/Section";
import ShimmerBar from "@/components/atoms/ShimmerBar";

export default function PostPageSkeleton() {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <SidebarWrapper>
        <div className="flex flex-col md:h-full">
          <Section
            title="INDEX"
            titleClassName="text-xs md:text-xs pb-1"
            className="mb-4 flex flex-1"
          >
            <ShimmerBar className="h-4 w-full mt-3" />
            <div className="hidden md:flex md:flex-col">
              <ShimmerBar className="h-4 w-3/5 mt-3 ml-1" />
              <ShimmerBar className="h-4 w-3/4 mt-3 ml-2" />
              <ShimmerBar className="h-4 w-full mt-3" />
              <ShimmerBar className="h-4 w-full mt-3 ml-1" />
            </div>
          </Section>
          <Section
            title="IMAGE"
            titleClassName="text-xs md:text-xs pb-1"
            className="h-52 hidden md:flex"
          >
            <ShimmerBar className="h-full w-full" />
          </Section>
        </div>
      </SidebarWrapper>
      <PostsContentWrapper>
        <PostSkeleton />
      </PostsContentWrapper>
    </div>
  );
}
