"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

import type { SanityImageProps } from "@/types";
import { SanityImage } from "./sanity-image";

type StoryCardProps = {
  title: string;
  subtitle?: string | null;
  image?: SanityImageProps | null;
  href?: string | null;
  openInNewTab?: boolean | null;
  className?: string;
  index?: number;
};

export function StoryCard({
  title,
  subtitle,
  image,
  href,
  openInNewTab,
  className,
  index = 0,
}: StoryCardProps) {
  const content = (
    <motion.article
      className={cn("group flex-shrink-0 cursor-pointer", className)}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-jamb-beige">
        {image && (
          <SanityImage
            className="h-full w-full rounded-none object-cover transition-transform duration-500 group-hover:scale-105"
            height={800}
            image={image}
            width={600}
          />
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg tracking-wide text-jamb-charcoal">
          {title}
        </h3>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
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
