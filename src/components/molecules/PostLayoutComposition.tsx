import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostContentWrapper from "@/components/atoms/wrapper/PostContentWrapper";
import SidebarWithResizer from "@/components/molecules/SidebarWithResizer";

export default function PostLayoutComposition({
  sidebar,
  content,
}: Record<"sidebar" | "content", React.ReactNode>) {
  return (
    <>
      <SidebarWrapper>
        <SidebarWithResizer
          id="sidebar-link"
          resizerProps={{
            initialLength: 350,
            min: 300,
            max: 700,
            direction: "right",
          }}
        >
          {sidebar}
        </SidebarWithResizer>
      </SidebarWrapper>
      <PostContentWrapper>{content}</PostContentWrapper>
    </>
  );
}
