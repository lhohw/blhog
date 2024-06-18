import Section from "@/components/molecules/Section";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

export default function PostsSkeleton() {
  return (
    <Section className="w-full min-h-[calc(100dvh-188px)] md:min-h-[calc(100dvh-108px)]">
      <div className="flex flex-wrap">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </Section>
  );
}
