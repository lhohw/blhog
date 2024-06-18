import ShimmerBar from "@/components/atoms/ShimmerBar";
import CardWrapper from "@/components/atoms/wrapper/CardWrapper";
import PhotoWrapper from "@/components/atoms/wrapper/PhotoWrapper";

export default function CardSkeleton() {
  return (
    <CardWrapper className="shimmer-bg">
      <div className="p-4 block border-slight border-primary rounded-lg">
        <PhotoWrapper>
          <ShimmerBar className="w-full h-full" />
          <ShimmerBar className="w-3/4 h-3 mt-3 self-end" />
        </PhotoWrapper>
        <div className="mt-4 py-3">
          <ShimmerBar className="w-3/4 h-4 mb-4" />
          <ShimmerBar className="w-1/2 h-5 my-2" />
          <ShimmerBar className="w-3/5 h-4 mt-4" />
        </div>
      </div>
    </CardWrapper>
  );
}
