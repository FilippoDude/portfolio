import "./studio.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { ROBLOX_STORE } from "./data";

// Headings in Space Grotesk; body text uses Manrope, which the root layout already loads
const grotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Filippo Grochala · 3D",
    template: "%s · Filippo Grochala 3D",
  },
  description:
    "Game-ready Roblox UGC gear and props, modelled in Blender and PBR textured in Substance Painter. Commissions open.",
  openGraph: {
    title: "Filippo Grochala · 3D",
    description:
      "Game-ready Roblox UGC gear and props, modelled in Blender and PBR textured in Substance Painter.",
    url: "/3d",
    images: [{ url: "/3d/renders/hero.jpg", width: 1872, height: 624 }],
    type: "website",
  },
};

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`studio min-h-screen ${grotesk.variable}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 bg-(--accent) text-(--accent-ink) px-3 py-2 rounded font-semibold"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[1180px] px-4">
        <header className="flex flex-wrap items-center justify-between gap-4 py-5">
          <Link
            href="/3d"
            className="font-display font-bold text-[1.05rem] uppercase tracking-[0.08em] no-underline"
          >
            Filippo Grochala <span className="text-(--accent)">3D</span>
          </Link>
          <nav aria-label="3D portfolio" className="flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem]">
            <Link href="/3d#work" className="py-1 text-(--muted) hover:text-(--fg) transition-colors">
              Work
            </Link>
            <Link href="/3d#hire" className="py-1 text-(--muted) hover:text-(--fg) transition-colors">
              Commissions
            </Link>
            <a
              href={ROBLOX_STORE}
              target="_blank"
              rel="noopener"
              className="py-1 text-(--muted) hover:text-(--fg) transition-colors"
            >
              Roblox store
            </a>
            <Link href="/" className="py-1 text-(--muted) hover:text-(--fg) transition-colors">
              Developer portfolio
            </Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-(--line) pt-6 pb-12 mt-24 text-(--muted) text-[0.875rem] flex flex-wrap justify-between gap-3">
          <p className="m-0">
            Renders made in Blender from the original game meshes. Every model on
            this site also loads live in your browser.
          </p>
          <p className="m-0">© Filippo Grochala</p>
        </footer>
      </div>
    </div>
  );
}
