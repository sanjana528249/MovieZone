import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Unlimited movies, neon{" "}
          <span className="text-primary drop-shadow-[0_0_25px_rgba(248,113,113,0.8)]">
            glow.
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-200 max-w-xl">
          MovieZone is a Netflix-style streaming experience with glassmorphism cards,
          neon accents, and your own My List & Continue Watching.
        </p>
        <ul className="text-sm text-slate-300 space-y-2">
          <li>• Trending, Popular and Top Rated rows</li>
          <li>• Personalized My List &amp; watch history</li>
          <li>• Admin catalog management</li>
        </ul>
        <div className="flex gap-4">
          <Link href="/signup" className="btn-primary">
            Get started
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-black/70 px-5 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-900"
          >
            I already have an account
          </Link>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4 w-full">
        <div className="glass-panel rounded-3xl h-40 md:h-52" />
        <div className="glass-panel rounded-3xl h-52 md:h-64 mt-6" />
        <div className="glass-panel rounded-3xl h-52 md:h-64 -mt-6" />
        <div className="glass-panel rounded-3xl h-40 md:h-52" />
      </div>
    </div>
  );
}

