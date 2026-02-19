export default function SkeletonCard() {
  return (
    <div className="relative rounded-[1.4rem] bg-slate-900/70 border border-slate-800/70 overflow-hidden animate-pulse min-w-[150px] max-w-[180px]">
      <div className="aspect-[2/3] bg-slate-800/70" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-3/4 bg-slate-800 rounded-full" />
        <div className="h-2 w-1/2 bg-slate-800 rounded-full" />
      </div>
    </div>
  );
}

