import Link from "next/link";
import { Skeleton } from "@workspace/ui/components/skeleton";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData } from "@/lib/sanity/query";
import type { QueryFooterDataResult } from "@/lib/sanity/sanity.types";
import { NewsletterForm } from "./newsletter-form";
import {
  InstagramIcon,
  PinterestIcon,
  VimeoIcon,
  YoutubeIcon,
} from "./social-icons";

type FooterProps = {
  data: NonNullable<QueryFooterDataResult>;
};

type SocialLinksProps = {
  socialLinks: NonNullable<QueryFooterDataResult>["socialLinks"];
};

function _SocialLinks({ socialLinks }: SocialLinksProps) {
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
          className="text-jamb-gray transition-colors hover:text-black"
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
      <div className="mx-auto">
        <div className="mb-7 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div aria-hidden="true" className="hidden md:block" />
          <div className="col-span-2">
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          {[1, 2, 3, 4, 5].map((col) => (
            <div key={col} className="border-jamb-gray border-t py-4">
              <Skeleton className="mb-4 h-5 w-24" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton className="h-4 w-20" key={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function Footer({ data }: FooterProps) {
  const { contactInfo, newsletter, columns, email } = data;

  return (
    <footer className="bg-[#d4d4d4] px-6 py-12 lg:px-8">
      <div className="mx-auto">
        {/* Top section: Contact, Email, Newsletter */}
        <div className="mb-7 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Contact & Email - spans 2 columns */}
          <div className="col-span-2 grid grid-cols-1 gap-6 text-jamb-gray md:grid-cols-2 lg:gap-10">
            {/* Contact Info */}
            <div className="leading-6">
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
                  className="mb-3 block text-jamb-gray transition-colors hover:text-black"
                >
                  {email}
                </a>
              )}
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
          <div className="mt-12 grid grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:gap-10">
            {columns.map((column, colIndex) => (
              <div key={`column-${column?._key}-${colIndex}`}>
                {/* Each column can have multiple sections */}
                {column?.sections?.map((section, sectionIndex) => (
                  <div
                    key={`section-${section?._key}-${sectionIndex}`}
                    className="border-jamb-gray border-t py-4 last:mb-0"
                  >
                    {/* Section Title */}
                    {section?.title && (
                      <h3 className="mb-1 text-base  leading-8 text-black">
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
                              className="text-base  leading-8 text-jamb-gray transition-colors hover:text-black"
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
