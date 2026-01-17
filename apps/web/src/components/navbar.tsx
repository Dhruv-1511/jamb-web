"use client";

import { env } from "@workspace/env/client";
import { cn } from "@workspace/ui/lib/utils";
import { Mail, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

import type {
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@/lib/sanity/sanity.types";
import { Logo } from "./logo";

// Type helpers using utility types
type NavigationData = {
  navbarData: QueryNavbarDataResult;
  settingsData: QueryGlobalSeoSettingsResult;
};

type NavColumn = NonNullable<
  NonNullable<QueryNavbarDataResult>["columns"]
>[number];

type ColumnLink =
  Extract<NavColumn, { type: "column" }>["links"] extends Array<infer T>
    ? T
    : never;

// Fetcher function
const fetcher = async (url: string): Promise<NavigationData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch navigation data");
  }
  return response.json();
};

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex h-24 items-center justify-between">
          <div className="h-12 w-28 animate-pulse rounded bg-muted/50" />
          <div className="hidden md:flex items-center gap-6">
            <div className="h-4 w-20 animate-pulse rounded bg-muted/50" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted/50" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted/50" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-6 w-6 animate-pulse rounded bg-muted/50" />
            <div className="h-6 w-6 animate-pulse rounded bg-muted/50" />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  navbarData
}: {
  isOpen: boolean;
  onClose: () => void;
  navbarData: QueryNavbarDataResult;
}) {
  const { columns } = navbarData || {};
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown(key: string) {
    setOpenDropdown(openDropdown === key ? null : key);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
      <div className="container mx-auto px-6 py-8">
        <nav className="grid gap-6">
          {columns?.map((column) => {
            if (column.type === "link") {
              return (
                <Link
                  key={column._key}
                  href={column.href || "#"}
                  className="text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
                  onClick={onClose}
                >
                  {column.name}
                </Link>
              );
            }

            if (column.type === "column") {
              const isDropdownOpen = openDropdown === column._key;
              return (
                <div key={column._key} className="grid gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-between text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
                    onClick={() => toggleDropdown(column._key)}
                  >
                    {column.title}
                  </button>
                  {isDropdownOpen && column.links && (
                    <div className="grid gap-2 pl-4 border-l border-foreground/20">
                      {column.links.map((link: ColumnLink) => (
                        <Link
                          key={link._key}
                          href={link.href || "#"}
                          className="text-base text-foreground/60 transition-colors hover:text-foreground"
                          onClick={onClose}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </nav>
      </div>
    </div>
  );
}

export function Navbar({
  navbarData: initialNavbarData,
  settingsData: initialSettingsData,
}: NavigationData) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data, error, isLoading } = useSWR<NavigationData>(
    "/api/navigation",
    fetcher,
    {
      fallbackData: {
        navbarData: initialNavbarData,
        settingsData: initialSettingsData,
      },
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: true,
      refreshInterval: 30_000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  const navigationData = data || {
    navbarData: initialNavbarData,
    settingsData: initialSettingsData,
  };
  const { navbarData, settingsData } = navigationData;
  const { columns } = navbarData || {};
  const { logo, siteTitle } = settingsData || {};

  // Track scroll position with hysteresis to prevent flickering
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Use different thresholds for scrolling up vs down to prevent flickering
      if (!isScrolled && scrollY > 80) {
        // Scrolling down - trigger at 80px
        setIsScrolled(true);
      } else if (isScrolled && scrollY < 30) {
        // Scrolling up - only untrigger when below 30px
        setIsScrolled(false);
      }

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Focus search input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close mobile menu when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isSearchOpen]);

  // Show skeleton only on initial mount when no fallback data is available
  if (isLoading && !data && !(initialNavbarData && initialSettingsData)) {
    return <NavbarSkeleton />;
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  // Get navigation links for center display
  const navLinks = columns?.filter(col => col.type === "link") || [];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-background transition-all duration-300 ease-in-out",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="container mx-auto px-6 md:px-10">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-in-out",
              isScrolled ? "h-16" : "h-24"
            )}
          >
            {/* Logo */}
            <div
              className={cn(
                "flex items-center transition-all duration-300 ease-in-out",
                isScrolled ? "scale-75 origin-left" : "scale-100"
              )}
            >
              {logo ? (
                <Logo
                  alt={siteTitle || ""}
                  height={48}
                  image={logo}
                  priority
                  width={140}
                />
              ) : (
                <Link
                  href="/"
                  className={cn(
                    "font-serif font-medium text-foreground transition-all duration-300",
                    isScrolled ? "text-2xl" : "text-4xl"
                  )}
                >
                  Jamb.
                </Link>
              )}
            </div>

            {/* Center Navigation Links - Desktop only */}
            {!isSearchOpen && (
              <nav
                className={cn(
                  "hidden md:flex items-center gap-2 transition-all duration-300 ease-in-out",
                  isScrolled ? "opacity-100" : "opacity-100"
                )}
              >
                {navLinks.map((link, index) => (
                  <div key={link._key} className="flex items-center">
                    {index > 0 && (
                      <span className="text-foreground/40 mx-2">|</span>
                    )}
                    <Link
                      href={link.type === "link" ? (link.href || "#") : "#"}
                      className={cn(
                        "text-foreground/60 transition-all duration-300 hover:text-foreground",
                        isScrolled ? "text-base" : "text-lg"
                      )}
                    >
                      {link.type === "link" ? link.name : ""}
                    </Link>
                  </div>
                ))}
              </nav>
            )}

            {/* Right side icons with search */}
            <div className="flex items-center">
              {/* Search area - expands when active */}
              <div className={cn(
                "flex items-center transition-all duration-300 ease-in-out",
                isSearchOpen ? "flex-1" : ""
              )}>
                {isSearchOpen ? (
                  // Expanded search input
                  <div className="flex items-center gap-3 flex-1">
                    <Search className="size-5 text-foreground/60 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search our collection..."
                      className="flex-1 bg-transparent border-b border-foreground/30 py-2 text-base outline-none placeholder:text-foreground/50 focus:border-foreground/60 min-w-[200px] md:min-w-[400px]"
                    />
                  </div>
                ) : (
                  // Search icon button
                  <button
                    type="button"
                    onClick={handleSearchToggle}
                    className="p-2 text-foreground/70 transition-colors hover:text-foreground"
                    aria-label="Open search"
                  >
                    <Search className={cn(
                      "transition-all duration-300",
                      isScrolled ? "size-5" : "size-6"
                    )} />
                  </button>
                )}
              </div>

              {/* Close button (when search is open) */}
              {isSearchOpen && (
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="p-2 ml-4 text-foreground/70 transition-colors hover:text-foreground"
                  aria-label="Close search"
                >
                  <X className="size-5" />
                </button>
              )}

              {/* Mail icon */}
              <Link
                href="/contact"
                className="p-2 text-foreground/70 transition-colors hover:text-foreground"
                aria-label="Contact"
              >
                <Mail className={cn(
                  "transition-all duration-300",
                  isScrolled ? "size-5" : "size-6"
                )} />
              </Link>

              {/* Mobile menu button - only on mobile */}
              {!isSearchOpen && (
                <button
                  type="button"
                  onClick={handleMobileMenuToggle}
                  className="p-2 text-foreground/70 transition-colors hover:text-foreground md:hidden"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? (
                    <X className="size-5" />
                  ) : (
                    <Menu className="size-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error boundary for SWR */}
        {error && env.NODE_ENV === "development" && (
          <div className="border-destructive/20 border-b bg-destructive/10 px-4 py-2 text-destructive text-xs">
            Navigation data fetch error: {error.message}
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navbarData={navbarData}
      />
    </>
  );
}
