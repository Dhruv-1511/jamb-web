"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

import type { PagebuilderType } from "@/types";
import { ProductCard } from "../elements/product-card";

type ProductGridBlockProps = PagebuilderType<"productGrid">;

const gridColsMap: Record<string, string> = {
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
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

  return (
    <section className="container py-pagebuilder bg-[#E3E3E3]">
        <motion.h2
          className="mx-auto text-center text-2xl font-medium leading-[36px] mb-8"
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
    </section>
  );
}
