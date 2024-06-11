import PostSidebarIndexSection from "@/components/organisms/PostSidebarIndexSection";
import PostSidebarImagesSection from "@/components/organisms/PostSidebarImagesSection";

export default function PostSidebar() {
  return (
    <div className="flex flex-col w-full z-10 transition-height duration-300 delay-100 relative top-0 left-0 bg-background md:h-full md:static md:bg-background-alpha md:border-r-slight md:border-primary p-4">
      <div className="flex flex-col h-full">
        <PostSidebarIndexSection />
        <PostSidebarImagesSection />
      </div>
    </div>
  );
}
