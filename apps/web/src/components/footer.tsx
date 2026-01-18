import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData } from "@/lib/sanity/query";
import type { QueryFooterDataResult } from "@/lib/sanity/sanity.types";
import { NewsletterForm } from "./newsletter-form";
import {
  InstagramIcon,
  YoutubeIcon,
  PinterestIcon,
  VimeoIcon,
} from "./social-icons";

type FooterProps = {
  data: NonNullable<QueryFooterDataResult>;
};

type SocialLinksProps = {
  socialLinks: NonNullable<QueryFooterDataResult>["socialLinks"];
};

function SocialLinks({ socialLinks }: SocialLinksProps) {
  if (!socialLinks) return null;

  const links = [
    { url: socialLinks.instagram, Icon: InstagramIcon, label: "Instagram" },
    { url: socialLinks.youtube, Icon: YoutubeIcon, label: "YouTube" },
    { url: socialLinks.pinterest, Icon: PinterestIcon, label: "Pinterest" },
    { url: socialLinks.vimeo, Icon: VimeoIcon, label: "Vimeo" },
  ].filter((link) => link.url);

  if (links.length === 0) return null;

  return (
    <div className="mt-3 flex gap-4">
      {links.map(({ url, Icon, label }) => (
        <a
          key={label}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9c9c9d] transition-colors hover:text-black"
          aria-label={label}
          href={url ?? "#"}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

export async function FooterServer() {
  const response = await sanityFetch({
    query: queryFooterData,
  });

  if (!response?.data) {
    return <FooterSkeleton />;
  }
  return <Footer data={response.data} />;
}

export function FooterSkeleton() {
  return (
    <footer className="bg-[#d4d4d4] px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top section skeleton */}
        <div className="mb-7 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
            <div className="h-20 animate-pulse rounded bg-gray-300" />
            <div className="h-20 animate-pulse rounded bg-gray-300" />
          </div>
          <div aria-hidden="true" className="hidden md:block" />
          <div className="col-span-2 h-40 animate-pulse rounded bg-gray-300" />
        </div>
        {/* Navigation columns skeleton */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          {[1, 2, 3, 4, 5].map((col) => (
            <div key={col}>
              <div className="border-gray-400 border-t pt-[14px]">
                <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-300" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      className="h-4 w-24 animate-pulse rounded bg-gray-300"
                      key={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function Footer({ data }: FooterProps) {
  const { contactInfo, email, newsletter, columns, socialLinks } = data;

  return (
    <footer className="bg-[#d4d4d4] px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top section: Contact, Email, Newsletter */}
        <div className="mb-7 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Contact & Email - spans 2 columns */}
          <div className="col-span-2 grid grid-cols-1 gap-6 font-medium text-[#9c9c9d] md:grid-cols-2 lg:gap-10">
            {/* Contact Info */}
            <div className="text-base leading-6">
              {contactInfo?.phone && (
                <p className="mb-0">Tel: {contactInfo.phone}</p>
              )}
              {contactInfo?.address?.split("\n").map((line, index) => (
                <p key={index} className="mb-0">
                  {line}
                </p>
              ))}
            </div>

            {/* Email & Social Links */}
            <div className="text-base leading-6">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="mb-3 block transition-colors hover:text-primary"
                >
                  {email}
                </a>
              )}
              <SocialLinks socialLinks={socialLinks} />
            </div>
          </div>

          {/* Empty spacer column */}
          <div aria-hidden="true" className="hidden md:block" />

          {/* Newsletter - spans 2 columns */}
          <div className="col-span-2 w-full max-w-xl">
            <NewsletterForm newsletter={newsletter} />
          </div>
        </div>

        {/* Navigation Columns */}
        {Array.isArray(columns) && columns.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            {columns.map((column, colIndex) => (
              <div key={`column-${column?._key}-${colIndex}`}>
                {/* Each column can have multiple sections */}
                {column?.sections?.map((section, sectionIndex) => (
                  <div
                    key={`section-${section?._key}-${sectionIndex}`}
                    className="mb-10 border-gray-400 border-t pt-[14px] last:mb-0"
                  >
                    {/* Section Title */}
                    {section?.title && (
                      <h3 className="mb-1 text-base !font-medium leading-8 text-black">
                        {section.title}
                      </h3>
                    )}
                    {/* Sub-links */}
                    {section?.links && section.links.length > 0 && (
                      <ul className="">
                        {section.links.map((link, linkIndex) => (
                          <p key={`${link?._key}-${linkIndex}`}>
                            <Link
                              href={link.href ?? "#"}
                              rel={
                                link.openInNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              target={link.openInNewTab ? "_blank" : undefined}
                              className="text-base font-medium leading-8 text-[#9c9c9d] transition-colors hover:text-black"
                            >
                              {link.name}
                            </Link>
                          </p>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
