import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="container-edge grid min-h-dvh place-items-center py-24">
      <div className="grid w-full max-w-3xl gap-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <p className="font-display text-[clamp(5rem,18vw,10rem)] leading-none font-semibold text-creator sm:text-right">
          4
        </p>
        <span aria-hidden className="mx-auto h-px w-full bg-divider sm:h-40 sm:w-px" />
        <p className="font-display text-[clamp(5rem,18vw,10rem)] leading-none font-semibold text-campus">
          04
        </p>
      </div>
      <div className="-mt-12 text-center">
        <h1 className="font-display text-h3 font-semibold">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-ink-2">The link may be old, or the address mistyped.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-medium text-bg transition-colors hover:bg-creator"
        >
          Back to Creatoredge Media
        </Link>
        <div className="mt-12 flex justify-center">
          <Wordmark />
        </div>
      </div>
    </main>
  );
}
