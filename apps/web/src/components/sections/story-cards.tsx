"use client";

import { motion } from "motion/react";

import type { PagebuilderType } from "@/types";
import { StoryCard } from "../elements/story-card";

type StoryCardsBlockProps = PagebuilderType<"storyCards">;

export function StoryCardsBlock({ title, stories }: StoryCardsBlockProps) {
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

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-5">
          {stories?.map((story, index) => (
            <StoryCard
              key={story._key}
              title={story.title || ""}
              subtitle={story.subtitle}
              image={story.image}
              href={story.href}
              openInNewTab={story.openInNewTab}
              index={index}
              className="w-64 md:w-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
