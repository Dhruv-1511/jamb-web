import { Menu, Plus } from "lucide-react";
import { defineField, defineType } from "sanity";

const drawerLink = defineField({
  name: "drawerLink",
  type: "object",
  title: "Drawer Link",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Link Text",
      description: "The text displayed for this link",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: "Link URL",
      description: "The URL this link will navigate to",
    }),
    defineField({
      name: "subLinks",
      type: "array",
      title: "Sub Links",
      description: "Optional sub-links that expand when clicking the + icon",
      of: [
        {
          type: "object",
          name: "subLink",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Link Text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "customUrl",
              title: "Link URL",
            }),
          ],
          preview: {
            select: {
              title: "name",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subLinks: "subLinks",
    },
    prepare({ title, subLinks = [] }) {
      return {
        title: title || "Untitled Link",
        subtitle:
          subLinks.length > 0
            ? `${subLinks.length} sub-link${subLinks.length === 1 ? "" : "s"}`
            : "No sub-links",
        media: subLinks.length > 0 ? Plus : Menu,
      };
    },
  },
});

export const drawerNavigation = defineType({
  name: "drawerNavigation",
  title: "Drawer Navigation",
  type: "document",
  icon: Menu,
  description: "Configure the navigation links shown in the drawer menu",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Drawer Navigation",
      title: "Label",
      description: "Internal label for this configuration",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "searchPlaceholder",
      type: "string",
      title: "Search Placeholder",
      description: "Placeholder text for the search input",
      initialValue: "Search our collection...",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Navigation Links",
      description: "The main navigation links shown in the drawer",
      of: [drawerLink],
    }),
  ],
  preview: {
    select: {
      title: "label",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Drawer Navigation",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
        media: Menu,
      };
    },
  },
});
