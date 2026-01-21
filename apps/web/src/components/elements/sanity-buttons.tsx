import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

import type { SanityButtonProps } from "@/types";

type SanityButtonsProps = {
  buttons: SanityButtonProps[] | null;
  className?: string;
  buttonClassName?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
};

function SanityButton({
  text,
  href,
  variant = "default",
  openInNewTab,
  className,
  ...props
}: SanityButtonProps & ComponentProps<typeof Button>) {
  if (!href) {
    return <Button>Link Broken</Button>;
  }

  return (
    <Button
      variant={variant}
      {...props}
      asChild
      className={cn(
        "relative group overflow-hidden text-base transition-colors duration-300",
        className
      )}
    >
      <Link
        aria-label={`Navigate to ${text}`}
        href={href || "#"}
        target={openInNewTab ? "_blank" : "_self"}
        title={`Click to visit ${text}`}
      >
        {/* Door animation layers */}
        <span className="absolute inset-y-0 left-0 w-0 bg-jamb-gray transition-all duration-500 group-hover:w-1/2" />
        <span className="absolute inset-y-0 right-0 w-0 bg-jamb-gray transition-all duration-500 group-hover:w-1/2" />
        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
          {text}
        </span>
      </Link>
    </Button>
  );
}

export function SanityButtons({
  buttons,
  className,
  buttonClassName,
  size = "default",
}: SanityButtonsProps) {
  if (!buttons?.length) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-col gap-4 sm:flex-row items-center", className)}
    >
      {buttons.map((button) => (
        <SanityButton
          key={`button-${button._key}`}
          size={size}
          {...button}
          className={buttonClassName}
        />
      ))}
    </div>
  );
}
