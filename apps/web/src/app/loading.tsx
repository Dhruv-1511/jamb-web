import { HeroSkeleton } from "@/components/sections/hero";
import { ProductGridSkeleton } from "@/components/sections/product-grid";
import { SplitFeatureSkeleton } from "@/components/sections/split-feature";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <HeroSkeleton />
      <div className="space-y-12 py-12">
        <ProductGridSkeleton />
        <SplitFeatureSkeleton />
      </div>
    </div>
  );
}
