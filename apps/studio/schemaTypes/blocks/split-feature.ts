import { LayoutPanelLeft } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, imageWithAltField } from "@/schemaTypes/common";
import { customRichText } from "@/schemaTypes/definitions/rich-text";
import { createRadioListLayout } from "@/utils/helper";

export const splitFeature = defineType({
  name: "splitFeature",
  title: "Split Feature",
  icon: LayoutPanelLeft,
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description: "Optional small text displayed above the title",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The main heading for this section",
      validation: (Rule) => Rule.required(),
    }),
    customRichText(["block"]),
    buttonsField,
    imageWithAltField({
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagePosition",
      type: "string",
      title: "Image Position",
      description: "Choose whether the image appears on the left or right",
      options: createRadioListLayout(["left", "right"]),
      initialValue: "right",
    }),
    defineField({
      name: "layout",
      type: "string",
      title: "Layout Style",
      description: "Choose the layout style for this section",
      options: createRadioListLayout([
        { title: "Standard (Split)", value: "standard" },
        { title: "Centered (Image Below)", value: "centered" },
        { title: "Overlay (Text on Image)", value: "overlay" },
      ]),
      initialValue: "standard",
    }),
    defineField({
      name: "overlayTitle",
      type: "string",
      title: "Overlay Title",
      description: "Large title displayed over the image (for overlay layout)",
      hidden: ({ parent }) => parent?.layout !== "overlay",
    }),
  ],
  preview: {
    select: {
      title: "title",
      layout: "layout",
      media: "image",
    },
    prepare: ({ title, layout, media }) => ({
      title: title || "Untitled Split Feature",
      subtitle: `Split Feature - ${layout || "standard"}`,
      media,
    }),
  },
});
