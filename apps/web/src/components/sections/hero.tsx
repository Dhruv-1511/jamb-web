import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({
  image,
}: HeroBlockProps) {
  return (
    <section id="hero" className="container">
      {image && (
        <SanityImage
          className="w-full object-cover object-center !rounded-none"
          fetchPriority="high"
          height={900}
          image={image}
          loading="eager"
          width={1920}
        />
      )}
    </section>
  );
}
