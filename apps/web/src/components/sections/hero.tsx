import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({
  image,
}: HeroBlockProps) {
  return (
    <section id="hero" style={{ backgroundColor: "#f3f0ed" }}>
      <div className="py-pagebuilder pt-0 pb-0 container">
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-center">
            {image && (
              <SanityImage
                className="object-cover object-center rounded-none"
                fetchPriority="high"
                height={900}
                image={image}
                loading="eager"
                width={1425}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
