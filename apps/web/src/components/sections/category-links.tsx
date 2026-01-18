"use client";

import Link from "next/link";

import type { PagebuilderType } from "@/types";

type CategoryLinksBlockProps = PagebuilderType<"categoryLinks">;

export function CategoryLinksBlock({ links }: CategoryLinksBlockProps) {
  if (!links || links.length === 0) return null;

  return (
    <section className="w-full border-t border-foreground/20 bg-background">
      <div className="container py-4">
        <nav className="flex items-center justify-center gap-2 flex-wrap font-medium">
          {links.map((link, index) => (
            <div key={link._key} className="flex items-center">
              {index > 0 && (
                <span className="text-foreground/40 mx-3">|</span>
              )}
              <Link
                href={link.href || "#"}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                className="text-[#9C9C9D] text-sm transition-colors hover:text-black"
              >
                {link.text}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
