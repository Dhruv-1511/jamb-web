"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

import type { PagebuilderType } from "@/types";
import { ProductCard } from "../elements/product-card";

type ProductGridBlockProps = PagebuilderType<"productGrid">;

export function ProductGridBlock({
  title,
  columns = "4",
  products,
}: ProductGridBlockProps) {
  const gridCols =
    columns === "6"
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="mb-12 text-center font-serif text-3xl font-medium tracking-tight text-jamb-charcoal md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h2>

        <div className={cn("grid gap-6 md:gap-8", gridCols)}>
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
      </div>
    </section>
  );
}
