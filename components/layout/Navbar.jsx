"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/browse", label: "Home" },
  { href: "/browse#trending", label: "Trending" },
  { href: "/browse#my-list", label: "My List" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md border-b border-slate-800/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-primary/20 border border-primary flex items-center justify-center shadow-lg shadow-red-900/40">
            <span className="text-primary font-black text-lg">MZ</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            Movie<span className="text-primary">Zone</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-primary-soft transition-colors ${
                pathname.startsWith("/browse") && l.href.startsWith("/browse")
                  ? "text-primary"
                  : "text-slate-200"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className={`text-sm ${
              pathname === "/login" ? "text-primary" : "text-slate-200"
            } hover:text-primary-soft`}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

