import { BookOpen } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const storyCards = defineType({
  name: "storyCards",
  title: "Story Cards",
  icon: BookOpen,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The heading for the stories section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stories",
      type: "array",
      title: "Stories",
      description: "Add story cards with portrait images",
      of: [
        defineArrayMember({
          type: "object",
          name: "storyCard",
          title: "Story Card",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Story Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              type: "string",
              title: "Subtitle",
              description: "Optional subtitle or category",
            }),
            imageWithAltField({
              description: "Portrait aspect ratio image (3:4)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              type: "customUrl",
              title: "Link",
              description: "Where should this story link to",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Untitled Story",
              subtitle,
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      stories: "stories",
    },
    prepare: ({ title, stories }) => ({
      title: title || "Untitled Story Cards",
      subtitle: `Story Cards - ${stories?.length || 0} items`,
    }),
  },
});
