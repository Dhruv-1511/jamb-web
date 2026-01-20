"use client";

import { env } from "@workspace/env/client";
import { cn } from "@workspace/ui/lib/utils";
import { Mail, Menu, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import type {
  QueryDrawerNavigationResult,
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@/lib/sanity/sanity.types";
import { Logo } from "./logo";

// Type helpers using utility types
type CategoryLink = {
  _key: string;
  text: string;
  openInNewTab: boolean | null;
  href: string | null;
};

type NavigationData = {
  navbarData: QueryNavbarDataResult;
  settingsData: QueryGlobalSeoSettingsResult;
  drawerData: QueryDrawerNavigationResult;
  categoryLinks?: CategoryLink[];
};

type NavColumn = NonNullable<
  NonNullable<QueryNavbarDataResult>["columns"]
>[number];

type ColumnLink =
  Extract<NavColumn, { type: "column" }>["links"] extends Array<infer T>
    ? T
    : never;

type DrawerLink = NonNullable<
  NonNullable<QueryDrawerNavigationResult>["links"]
>[number];

// Fetcher function
const fetcher = async (url: string): Promise<NavigationData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch navigation data");
  }
  return response.json();
};

// Custom hook for scroll tracking
function useScrollTracking() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return isScrolled;
}

// Custom hook for navbar state management
function useNavbarState() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Close drawer when pressing escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return {
    isSearchOpen,
    isMobileMenuOpen,
    isDrawerOpen,
    setIsMobileMenuOpen,
    searchInputRef,
    handleSearchToggle,
    handleDrawerToggle,
  };
}

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
            <div className="h-6 w-6 animate-pulse rounded bg-muted/50" />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavigationDrawer({
  isOpen,
  onClose,
  drawerData,
  settingsData,
  categoryLinks,
}: {
  isOpen: boolean;
  onClose: () => void;
  drawerData: QueryDrawerNavigationResult;
  settingsData: QueryGlobalSeoSettingsResult;
  categoryLinks?: CategoryLink[];
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { logo, siteTitle } = settingsData || {};
  const { links, searchPlaceholder } = drawerData || {};

  function toggleExpanded(key: string) {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close drawer"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#E8E8E8] shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6">
            {/* Logo */}
            <div className="flex items-center">
              {logo ? (
                <Logo
                  alt={siteTitle || ""}
                  height={40}
                  image={logo}
                  width={120}
                />
              ) : (
                <Link
                  href="/"
                  className="font-serif text-3xl font-medium text-foreground"
                  onClick={onClose}
                >
                  Jamb.
                </Link>
              )}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3 border-b border-foreground/30 pb-2">
              <Search className="size-5 text-foreground/50" />
              <input
                type="text"
                placeholder={searchPlaceholder || "Search our collection..."}
                className="flex-1 bg-transparent text-base outline-none placeholder:text-foreground/50"
              />
            </div>
          </div>

          {/* Category Links */}
          {categoryLinks && categoryLinks.length > 0 && (
            <div className="px-6 py-2">
              <nav className="flex flex-col">
                {categoryLinks.map((link) => (
                  <Link
                    key={link._key}
                    href={link.href || "#"}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    className="border-b border-foreground/10 py-5 text-2xl font-serif text-foreground transition-colors hover:opacity-70"
                    onClick={onClose}
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-6">
            <div className="space-y-0">
              {links?.map((link: DrawerLink) => {
                const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                const isExpanded = expandedItems.includes(link._key);

                return (
                  <div
                    key={link._key}
                    className="border-b border-foreground/20"
                  >
                    <div className="flex items-center justify-between py-4">
                      <Link
                        href={link.href || "#"}
                        target={link.openInNewTab ? "_blank" : undefined}
                        rel={
                          link.openInNewTab ? "noopener noreferrer" : undefined
                        }
                        className="text-lg font-medium text-foreground transition-colors hover:text-foreground/70"
                        onClick={!hasSubLinks ? onClose : undefined}
                      >
                        {link.name}
                      </Link>
                      {hasSubLinks && (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(link._key)}
                          className="p-1 text-foreground/70 transition-colors hover:text-foreground"
                          aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                          <Plus
                            className={cn(
                              "size-5 transition-transform duration-200",
                              isExpanded && "rotate-45"
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {/* Sub Links */}
                    {hasSubLinks && isExpanded && (
                      <div className="pb-4 ps-4 space-y-3">
                        {link.subLinks?.map((subLink) => (
                          <Link
                            key={subLink._key}
                            href={subLink.href || "#"}
                            target={subLink.openInNewTab ? "_blank" : undefined}
                            rel={
                              subLink.openInNewTab
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block text-base text-foreground/70 transition-colors hover:text-foreground"
                            onClick={onClose}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  navbarData,
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
                    <div className="grid gap-2 ps-4 border-s border-foreground/20">
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

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <extracted logic into custom hooks and components>
export function Navbar({
  navbarData: initialNavbarData,
  settingsData: initialSettingsData,
  drawerData: initialDrawerData,
}: NavigationData) {
  const isScrolled = useScrollTracking();
  const {
    isSearchOpen,
    isMobileMenuOpen,
    isDrawerOpen,
    setIsMobileMenuOpen,
    searchInputRef,
    handleSearchToggle,
    handleDrawerToggle,
  } = useNavbarState();

  const { data, error, isLoading } = useSWR<NavigationData>(
    "/api/navigation",
    fetcher,
    {
      fallbackData: {
        navbarData: initialNavbarData,
        settingsData: initialSettingsData,
        drawerData: initialDrawerData,
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
    drawerData: initialDrawerData,
    categoryLinks: [],
  };
  const { navbarData, settingsData, drawerData, categoryLinks } =
    navigationData;
  const { columns } = navbarData || {};
  const { logo, siteTitle } = settingsData || {};

  // Show skeleton only on initial mount when no fallback data is available
  if (isLoading && !data && !(initialNavbarData && initialSettingsData)) {
    return <NavbarSkeleton />;
  }

  // Get navigation links for center display
  const navLinks = columns?.filter((col) => col.type === "link") || [];

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
              isScrolled ? "py-4" : "py-8"
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
                      href={link.type === "link" ? link.href || "#" : "#"}
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
            <div className="flex items-center gap-7">
              {/* Search area - expands when active */}
              <div
                className={cn(
                  "flex items-center transition-all duration-300 ease-in-out",
                  isSearchOpen ? "flex-1" : ""
                )}
              >
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
                    className="text-[#9C9C9D] transition-colors hover:text-black cursor-pointer"
                    aria-label="Open search"
                  >
                    <Search
                      className={cn(
                        "transition-all duration-300",
                        isScrolled ? "size-5" : "size-7"
                      )}
                    />
                  </button>
                )}
              </div>

              {/* Close button (when search is open) */}
              {isSearchOpen && (
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="p-2 ms-4 text-[#9C9C9D] transition-colors hover:text-black cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="size-5" />
                </button>
              )}

              {/* Mail icon */}
              {!isSearchOpen && (
                <Link
                  href="/contact"
                  className="text-[#9C9C9D] transition-colors hover:text-black cursor-pointer"
                  aria-label="Contact"
                >
                  <Mail
                    className={cn(
                      "transition-all duration-300",
                      isScrolled ? "size-5" : "size-7"
                    )}
                  />
                </Link>
              )}

              {/* Hamburger menu button - visible on all screen sizes */}
              {!isSearchOpen && (
                <button
                  type="button"
                  onClick={handleDrawerToggle}
                  className="text-[#9C9C9D] transition-colors hover:text-black cursor-pointer"
                  aria-label="Open menu"
                >
                  <Menu
                    className={cn(
                      "transition-all duration-300",
                      isScrolled ? "size-5" : "size-7"
                    )}
                  />
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

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        drawerData={drawerData}
        settingsData={settingsData}
        categoryLinks={categoryLinks}
      />

      {/* Mobile Menu (legacy - kept for backward compatibility) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navbarData={navbarData}
      />
    </>
  );
}
