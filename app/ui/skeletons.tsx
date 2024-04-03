export const SideNavSkeleton = () => {
  return (
    <div
      className={`
        flex flex-col flex-none h-full min-w-20 lg:min-w-[295px] bg-darkgray 
        rounded-tr-2xl border-slight border-sea-200 relative
      `}
    />
  );
};

export const PostsSkeleton = () => {
  return <div className="w-full min-w-[500px]">fetch posts...</div>;
};

export const PostSkeleton = () => {
  return <div>MDX formatting...</div>;
};
