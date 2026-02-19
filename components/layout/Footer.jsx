export default function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-black/80">
      <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} MovieZone. Netflix-inspired clone.</span>
        <span>Built with Next.js &amp; MongoDB.</span>
      </div>
    </footer>
  );
}

