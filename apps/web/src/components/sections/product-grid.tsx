"use client";

import { cn } from "@workspace/ui/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import type { PagebuilderType } from "@/types";
import { ProductCard } from "../elements/product-card";

type ProductGridBlockProps = PagebuilderType<"productGrid">;

const gridColsMap: Record<string, string> = {
  "4": "grid-cols-4",
  "5": "grid-cols-5",
};

export function ProductGridBlock({
  title,
  columns = "4",
  products,
}: ProductGridBlockProps) {
  // Clean columns value - extract only digit (removes invisible Unicode characters from Sanity)
  const cleanColumns = columns?.replace(/[^\d]/g, "") || "4";
  const gridCols = gridColsMap[cleanColumns] || gridColsMap["4"];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: "auto",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      const currentIndex = emblaApi.selectedScrollSnap();
      // Determine how many cards to scroll based on screen size
      // This is a simplified approach - in a real app you might use a more sophisticated method
      const scrollAmount =
        window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      const newIndex = Math.max(0, currentIndex - scrollAmount);
      emblaApi.scrollTo(newIndex);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      const currentIndex = emblaApi.selectedScrollSnap();
      const totalSlides = emblaApi.slideNodes().length;
      // Determine how many cards to scroll based on screen size
      const scrollAmount =
        window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      const newIndex = Math.min(totalSlides - 1, currentIndex + scrollAmount);
      emblaApi.scrollTo(newIndex);
    }
  }, [emblaApi]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="container p-10 bg-[#E3E3E3] overflow-hidden">
      <motion.h2
        className="mx-auto text-center text-xl font-medium leading-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>

      {/* Grid Layout - lg and above */}
      <div className={cn("hidden lg:grid gap-6 md:gap-8", gridCols)}>
        {products?.map((product, index) => (
          <ProductCard
            key={product._key}
            title={product.title || ""}
            subtitle={product.subtitle}
            image={product.image}
            href={product.href}
            openInNewTab={product.openInNewTab}
            index={index}
          />
        ))}
      </div>

      {/* Slider - below lg */}
      <div className="relative lg:hidden">
        {canScrollPrev && (
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            aria-label="Scroll previous"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
        )}
        {canScrollNext && (
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            aria-label="Scroll next"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        )}
        <div className="overflow-hidden -mx-10 px-10" ref={emblaRef}>
          <div className="flex gap-6">
            {products?.map((product, index) => (
              <div
                key={product._key}
                className="shrink-0 w-full sm:w-1/2 md:w-1/3"
              >
                <ProductCard
                  title={product.title || ""}
                  subtitle={product.subtitle}
                  image={product.image}
                  href={product.href}
                  openInNewTab={product.openInNewTab}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
