"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

import { Skeleton } from "@workspace/ui/components/skeleton";

import type { SanityImageProps } from "@/types";
import { SanityImage } from "./sanity-image";

type ProductCardProps = {
  title: string;
  subtitle?: string | null;
  image?: SanityImageProps | null;
  href?: string | null;
  openInNewTab?: boolean | null;
  className?: string;
  index?: number;
};

export function ProductCard({
  title,
  subtitle,
  image,
  href,
  openInNewTab,
  className,
  index = 0,
}: ProductCardProps) {
  const content = (
    <motion.article
      className={cn("group cursor-pointer", className)}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="relative overflow-hidden w-full aspect-4/3 h-64">
        {image && (
          <motion.div
            className="h-full w-full"
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <SanityImage
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: "contain",
                objectPosition: "center",
                color: "transparent",
              }}
              className="w-full max-h-full"
              height={600}
              image={image}
              width={600}
            />
          </motion.div>
        )}
      </div>
      <div className="mt-3 text-center">
        <h3 className="truncate text-center font-semibold leading-6 text-[#737373]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-center leading-6 text-[#737373]">
            {subtitle}
          </p>
        )}
      </div>
    </motion.article>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={openInNewTab ? "_blank" : "_self"}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return content;
}

export function ProductCardSkeleton() {
  return (
    <div className="group w-full">
      <div className="relative aspect-4/3 overflow-hidden">
        <Skeleton className="h-full w-full rounded-none!" />
      </div>
      <div className="mt-3 flex flex-col items-center space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
