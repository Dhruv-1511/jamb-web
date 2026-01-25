"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type SplitFeatureBlockProps = PagebuilderType<"splitFeature"> & {
  className?: string;
};

function StandardLayout({
  eyebrow,
  title,
  richText,
  buttons,
  image,
  imagePosition,
  className,
}: SplitFeatureBlockProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className={cn("container py-pagebuilder", className)}>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
          isImageLeft && "lg:[&>*:first-child]:order-2"
        )}
      >
        <motion.div
          className="col-span-1 flex flex-col justify-center max-w-lg mx-auto"
          initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          {eyebrow && (
            <p className="text-base font-medium uppercase mb-6 text-center leading-6">
              {eyebrow}
            </p>
          )}
          <h2 className="text-4xl text-balance font-medium md:text-4xl mb-8 text-center">
            {title}
          </h2>
          <RichText
            className="mb-6 max-md:prose-p:text-sm text-start leading-6"
            richText={richText}
          />
          <SanityButtons buttons={buttons} className="flex !flex-col gap-3 " />
        </motion.div>

        <motion.div
          className="col-span-1 flex items-center justify-center"
          initial={{ opacity: 0, x: isImageLeft ? -20 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="relative flex items-center justify-center md:mx-8 lg:mx-12 xl:mx-20">
            {image && (
              <SanityImage
                className="!rounded-none !h-auto !w-auto !max-h-none !max-w-full object-contain"
                height={1000}
                image={image}
                style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                width={800}
              />
            )}
          </div>
        </motion.div>
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
  className,
}: SplitFeatureBlockProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
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
  className,
}: SplitFeatureBlockProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
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

