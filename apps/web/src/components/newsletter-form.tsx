"use client";

import Link from "next/link";
import { useState } from "react";

import type { QueryFooterDataResult } from "@/lib/sanity/sanity.types";

type NewsletterFormProps = {
  newsletter: NonNullable<QueryFooterDataResult>["newsletter"];
};

export function NewsletterForm({ newsletter }: NewsletterFormProps) {
  const [agreed, setAgreed] = useState(false);

  if (!newsletter) return null;

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <h3 className="mb-2 text-base font-medium leading-6 text-[#9c9c9d]">
          {newsletter.title || "Newsletter"}
        </h3>
        <div className="flex gap-0.5">
          <input
            type="email"
            placeholder={newsletter.placeholder || "Enter your email"}
            className="h-11 flex-1 border-0 bg-white px-3 py-1 text-base font-light text-[#9c9c9d] placeholder:text-[#9c9c9d] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
          <button
            type="submit"
            className="h-11 shrink-0 border-0 border-[#757575] bg-white px-4 py-2 text-base font-medium text-[#9c9c9d] transition-colors duration-300 hover:bg-neutral-500 hover:text-white"
          >
            {newsletter.buttonText || "Subscribe"}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="radio"
          id="privacy-agreement"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-gray-400 checked:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 checked:[background-image:radial-gradient(circle,#fff_35%,transparent_35%)]"
        />
        <label
          htmlFor="privacy-agreement"
          className="cursor-pointer text-[#9c9c9d] font-medium"
        >
          I agree to our{" "}
          <Link
            href={newsletter.privacyLinkHref || "/privacy"}
            target={newsletter.privacyLinkOpenInNewTab ? "_blank" : undefined}
            rel={
              newsletter.privacyLinkOpenInNewTab
                ? "noopener noreferrer"
                : undefined
            }
            className="hover:text-primary transition-colors "
          >
            Privacy Policy
          </Link>
        </label>
      </div>
    </form>
  );
}
