import { Link2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const categoryLinks = defineType({
  name: "categoryLinks",
  title: "Category Links",
  icon: Link2,
  type: "object",
  fields: [
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Add category links to display in a horizontal row",
      of: [
        {
          type: "object",
          name: "categoryLink",
          fields: [
            defineField({
              name: "text",
              type: "string",
              title: "Link Text",
              description: "The text to display for this link",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "customUrl",
              title: "Link URL",
              description: "The URL this link will navigate to",
            }),
          ],
          preview: {
            select: {
              title: "text",
              externalUrl: "url.external",
              urlType: "url.type",
              internalUrl: "url.internal.slug.current",
            },
            prepare({ title, externalUrl, urlType, internalUrl }) {
              const url = urlType === "external" ? externalUrl : internalUrl;
              return {
                title: title || "Untitled Link",
                subtitle: url || "No URL set",
                media: Link2,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      links: "links",
    },
    prepare({ links = [] }) {
      const linkTexts = links
        .slice(0, 3)
        .map((l: { text?: string }) => l.text)
        .join(" | ");
      return {
        title: linkTexts || "Category Links",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});
