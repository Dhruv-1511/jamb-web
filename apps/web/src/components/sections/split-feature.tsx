"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type SplitFeatureBlockProps = PagebuilderType<"splitFeature">;

function StandardLayout({
  eyebrow,
  title,
  richText,
  buttons,
  image,
  imagePosition,
}: SplitFeatureBlockProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
            isImageLeft && "lg:[&>*:first-child]:order-2"
          )}
        >
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {eyebrow && (
              <p className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
                {eyebrow}
              </p>
            )}
            <h2 className="font-serif text-4xl font-medium tracking-tight text-jamb-charcoal md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <RichText
              className="prose-lg text-muted-foreground"
              richText={richText}
            />
            <SanityButtons buttons={buttons} className="pt-4" />
          </motion.div>

          <motion.div
            className="relative aspect-[4/3] overflow-hidden bg-jamb-beige"
            initial={{ opacity: 0, x: isImageLeft ? -20 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {image && (
              <SanityImage
                className="h-full w-full rounded-none object-cover"
                height={800}
                image={image}
                width={1200}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CenteredLayout({
  eyebrow,
  title,
  richText,
  buttons,
  image,
}: SplitFeatureBlockProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-3xl space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {eyebrow && (
            <p className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif text-4xl font-medium tracking-tight text-jamb-charcoal md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <RichText
            className="prose-lg mx-auto text-muted-foreground"
            richText={richText}
          />
          <SanityButtons buttons={buttons} className="justify-center pt-4" />
        </motion.div>

        <motion.div
          className="mt-12 aspect-[21/9] overflow-hidden bg-jamb-beige"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {image && (
            <SanityImage
              className="h-full w-full rounded-none object-cover"
              height={600}
              image={image}
              width={1600}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function OverlayLayout({
  title,
  overlayTitle,
  image,
  buttons,
}: SplitFeatureBlockProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="relative aspect-[21/9] min-h-[400px] overflow-hidden bg-jamb-charcoal md:min-h-[500px]"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          {image && (
            <SanityImage
              className="absolute inset-0 h-full w-full rounded-none object-cover opacity-80"
              height={800}
              image={image}
              width={1600}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            {overlayTitle && (
              <motion.h2
                className="font-serif text-5xl font-light tracking-wide text-white md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {overlayTitle}
              </motion.h2>
            )}
            {!overlayTitle && title && (
              <motion.h2
                className="font-serif text-5xl font-light tracking-wide text-white md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {title}
              </motion.h2>
            )}
            <SanityButtons
              buttons={buttons}
              className="mt-8"
              buttonClassName="bg-white text-jamb-charcoal hover:bg-white/90"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SplitFeatureBlock(props: SplitFeatureBlockProps) {
  const { layout = "standard" } = props;

  switch (layout) {
    case "centered":
      return <CenteredLayout {...props} />;
    case "overlay":
      return <OverlayLayout {...props} />;
    default:
      return <StandardLayout {...props} />;
  }
}
