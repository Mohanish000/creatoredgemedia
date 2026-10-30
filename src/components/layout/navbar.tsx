"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import type { NavItem } from "@/types/content";
import { AGENCY_LIST } from "@/data/agencies";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/layout/wordmark";
import { MobileMenu } from "@/components/layout/mobile-menu";

interface Props {
  items: NavItem[];
}

const SECTION_TO_NAV: Record<string, string> = {
  "creator-edge": "creators",
  "campus-edge": "creators",
  brands: "brands",
  services: "services",
  about: "about",
  contact: "contact",
};

export function Navbar({ items }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [creatorsOpen, setCreatorsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const creatorsRef = useRef<HTMLDivElement>(null);
  const creatorsButtonRef = useRef<HTMLButtonElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const active = useActiveSection(Object.keys(SECTION_TO_NAV));
  const activeNav = active ? SECTION_TO_NAV[active] : null;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!creatorsOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!creatorsRef.current?.contains(event.target as Node)) setCreatorsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCreatorsOpen(false);
        creatorsButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [creatorsOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  const linkClass = (isActive: boolean, accent?: string) =>
    cn(
      "link-underline inline-flex min-h-11 items-center px-1 text-nav text-ink-2 transition-colors hover:text-ink",
      isActive && `text-ink ${accent ?? ""}`,
    );

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute top-6 left-0 h-px w-px"
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b transition-[background-color,border-color] duration-300",
          scrolled ? "border-edge bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="container-edge flex h-full items-center justify-between">
          <a href="#top">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
            {items.map((item) =>
              item.id === "creators" ? (
                <div key={item.id} ref={creatorsRef} className="relative">
                  <button
                    ref={creatorsButtonRef}
                    type="button"
                    aria-expanded={creatorsOpen}
                    aria-controls="creators-menu"
                    onClick={() => setCreatorsOpen((v) => !v)}
                    aria-current={activeNav === "creators" ? "location" : undefined}
                    className={cn(linkClass(activeNav === "creators"), "gap-1")}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={cn("size-4 transition-transform", creatorsOpen && "rotate-180")}
                    />
                  </button>
                  {creatorsOpen ? (
                    <ul
                      id="creators-menu"
                      className="absolute top-full left-1/2 mt-2 w-72 -translate-x-1/2 border border-edge bg-bg-2 p-2 shadow-2xl"
                    >
                      {AGENCY_LIST.map((agency) => (
                        <li key={agency.id}>
                          <a
                            href={`#${agency.anchorId}`}
                            onClick={() => setCreatorsOpen(false)}
                            className="group block px-4 py-3 transition-colors hover:bg-elevated"
                          >
                            <span
                              className="font-display text-base font-semibold"
                              style={{ color: agency.accentVar }}
                            >
                              {agency.shortName}
                            </span>
                            <span className="mt-0.5 block text-caption text-ink-2">
                              {agency.id === "creator-edge"
                                ? "Education creators"
                                : "Campus voices"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={activeNav === item.id ? "location" : undefined}
                  className={linkClass(activeNav === item.id)}
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-nav font-medium text-bg transition-colors hover:bg-creator"
            >
              Let&apos;s Collaborate
            </a>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-divider md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} items={items} />
    </>
  );
}
