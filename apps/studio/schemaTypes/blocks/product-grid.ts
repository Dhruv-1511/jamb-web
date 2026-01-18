import { Grid2x2 } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";
import { createRadioListLayout } from "@/utils/helper";

export const productGrid = defineType({
  name: "productGrid",
  title: "Product Grid",
  icon: Grid2x2,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The heading for the product grid section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "columns",
      type: "string",
      title: "Columns",
      description: "Number of columns in the grid on desktop",
      options: createRadioListLayout([
        { title: "4 Columns", value: "4" },
        { title: "5 Columns", value: "5" },
      ]),
      initialValue: "4",
    }),
    defineField({
      name: "products",
      type: "array",
      title: "Products",
      description: "Add products to display in the grid",
      of: [
        defineArrayMember({
          type: "object",
          name: "productCard",
          title: "Product Card",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Product Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              type: "string",
              title: "Subtitle",
              description: "Optional subtitle or category",
            }),
            imageWithAltField({
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              type: "customUrl",
              title: "Link",
              description: "Where should this product link to",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Untitled Product",
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
      products: "products",
    },
    prepare: ({ title, products }) => ({
      title: title || "Untitled Product Grid",
      subtitle: `Product Grid - ${products?.length || 0} items`,
    }),
  },
});
