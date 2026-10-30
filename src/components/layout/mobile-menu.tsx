"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { NavItem } from "@/types/content";
import { AGENCIES } from "@/data/agencies";
import { duration, ease } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Wordmark } from "@/components/layout/wordmark";

interface Props {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose, items }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previous;
    };
  }, [open, onClose]);

  const links = [
    { label: AGENCIES["creator-edge"].shortName, href: "#creator-edge", accent: "text-creator" },
    { label: AGENCIES["campus-edge"].shortName, href: "#campus-edge", accent: "text-campus" },
    ...items
      .filter((item) => item.id !== "creators")
      .map((item) => ({ label: item.label, href: item.href, accent: "text-ink" })),
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex flex-col bg-bg px-[max(var(--gutter),env(safe-area-inset-left))] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduced ? duration.fast : duration.base, ease: ease.inOut }}
        >
          <div className="flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <Wordmark />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border border-divider"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-6"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`font-display text-[clamp(2.25rem,10vw,3.5rem)] leading-[1.1] font-semibold tracking-tight ${link.accent}`}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduced ? 0 : 0.15 + i * 0.05,
                  duration: duration.base,
                  ease: ease.out,
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex shrink-0 pb-6">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-base font-medium text-bg"
            >
              Let&apos;s Collaborate
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
