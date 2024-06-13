import PostSidebarWrapper from "@/components/atoms/wrapper/PostSidebarWrapper";
import PostSidebarIndexSection from "@/components/organisms/PostSidebarIndexSection";
import PostSidebarImagesSection from "@/components/organisms/PostSidebarImagesSection";

export default function PostSidebar() {
  return (
    <PostSidebarWrapper>
      <PostSidebarIndexSection />
      <PostSidebarImagesSection />
    </PostSidebarWrapper>
  );
}
