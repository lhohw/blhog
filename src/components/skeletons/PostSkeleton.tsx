import ShimmerBar from "@/components/atoms/ShimmerBar";

export default function PostSkeleton() {
  return (
    <div className="py-8 px-6 md:px-12">
      <div className="w-full flex flex-col">
        <ShimmerBar className="w-1/2 ml-4 mt-6 mb-10 h-16" />
        <ShimmerBar className="flex self-end w-24 mr-4 mb-4 h-5" />

        <ShimmerBar className="w-1/3 my-4 h-10" />
        <ShimmerBar className="my-1.5 w-4/5 h-5" />
        <ShimmerBar className="my-1.5 w-full h-5" />
        <ShimmerBar className="my-1.5 w-1/3 h-5" />

        <div className="my-3" />
        <ShimmerBar className="w-1/2 my-4 h-10" />
        <ShimmerBar className="my-1.5 w-full h-5" />
        <ShimmerBar className="my-1.5 w-full h-5" />
        <ShimmerBar className="my-1.5 w-2/3 h-5" />
      </div>
    </div>
  );
}
