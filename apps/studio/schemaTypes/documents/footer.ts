import {
  Columns,
  LayoutPanelLeft,
  Link,
  List,
  Mail,
  MapPin,
  Newspaper,
  PanelBottom,
  Phone,
} from "lucide-react";
import { defineField, defineType } from "sanity";

// Sub-link within a section (gray text links)
const footerSectionLink = defineField({
  name: "footerSectionLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Display text for the link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

// Section within a column (has a title and sub-links)
const footerSection = defineField({
  name: "footerSection",
  type: "object",
  title: "Section",
  icon: List,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description: "Title for this section (displayed as plain text)",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Sub-Links",
      description: "Links displayed below the section title",
      of: [footerSectionLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Section",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
        media: List,
      };
    },
  },
});

// Column containing multiple sections
const footerColumn = defineField({
  name: "footerColumn",
  type: "object",
  title: "Column",
  icon: Columns,
  fields: [
    defineField({
      name: "sections",
      type: "array",
      title: "Sections",
      description: "Sections in this column (e.g., 'Reproduction Fireplaces' and 'Antique Chimneypieces' in the same column)",
      of: [footerSection],
    }),
  ],
  preview: {
    select: {
      sections: "sections",
    },
    prepare({ sections = [] }) {
      const sectionTitles = sections
        .map((s: { title?: string }) => s.title)
        .filter(Boolean)
        .join(", ");
      return {
        title: sectionTitles || "Empty Column",
        subtitle: `${sections.length} section${sections.length === 1 ? "" : "s"}`,
        media: Columns,
      };
    },
  },
});

const contactInfo = defineField({
  name: "contactInfo",
  type: "object",
  title: "Contact Information",
  icon: Phone,
  fields: [
    defineField({
      name: "phone",
      type: "string",
      title: "Phone Number",
      description: "Phone number displayed in footer (e.g., +44 (0) 207 730 2122)",
    }),
    defineField({
      name: "address",
      type: "text",
      rows: 2,
      title: "Address",
      description: "Physical address (e.g., 95-97 Pimlico Rd, London SW1W 8PH)",
    }),
  ],
});

const newsletter = defineField({
  name: "newsletter",
  type: "object",
  title: "Newsletter Section",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Newsletter section title",
      initialValue: "Newsletter",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      title: "Description",
      description: "Description text below the newsletter title",
      initialValue: "Sign up to receive our curated newsletter detailing the latest acquisitions, product designs and news from our collections.",
    }),
    defineField({
      name: "placeholder",
      type: "string",
      title: "Input Placeholder",
      description: "Placeholder text for the email input",
      initialValue: "Enter your email",
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Button Text",
      description: "Text for the subscribe button",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "privacyText",
      type: "string",
      title: "Privacy Text",
      description: "Text shown next to the privacy checkbox",
      initialValue: "I agree to our Privacy Policy",
    }),
    defineField({
      name: "privacyLink",
      type: "customUrl",
      title: "Privacy Policy Link",
      description: "Link to the privacy policy page",
    }),
  ],
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer content for your website",
  groups: [
    { name: "contact", title: "Contact Info", icon: MapPin },
    { name: "newsletter", title: "Newsletter", icon: Mail },
    { name: "navigation", title: "Navigation", icon: Link },
  ],
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactInfo",
      type: "object",
      title: "Contact Information",
      group: "contact",
      fields: contactInfo.fields,
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email Address",
      description: "Contact email displayed in footer",
      group: "contact",
    }),
    defineField({
      name: "newsletter",
      type: "object",
      title: "Newsletter Section",
      group: "newsletter",
      fields: newsletter.fields,
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Navigation Columns",
      description: "Link columns for the footer navigation",
      group: "navigation",
      of: [footerColumn],
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Footer",
      media: PanelBottom,
    }),
  },
});
