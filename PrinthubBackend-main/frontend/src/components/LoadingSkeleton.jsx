function LoadingSkeleton({ cards = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="animate-pulseSoft overflow-hidden rounded-[30px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="aspect-[4/3] rounded-[24px] bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-6 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
