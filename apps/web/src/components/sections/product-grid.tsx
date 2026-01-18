"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@workspace/ui/lib/utils";

import type { PagebuilderType } from "@/types";
import { ProductCard } from "../elements/product-card";

type ProductGridBlockProps = PagebuilderType<"productGrid">;

const gridColsMap: Record<string, string> = {
  "4": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  "5": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
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
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
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
    <section className="container p-10 bg-[#E3E3E3]">
      <motion.h2
        className="mx-auto text-center text-xl font-medium leading-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>

      {/* Grid Layout - sm and above */}
      <div className={cn("hidden sm:grid gap-6 md:gap-8", gridCols)}>
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

      {/* Slider - below sm (mobile) */}
      <div className="relative sm:hidden">
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
              <div key={product._key} className="shrink-0 w-[calc(100vw-5rem)]">
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
