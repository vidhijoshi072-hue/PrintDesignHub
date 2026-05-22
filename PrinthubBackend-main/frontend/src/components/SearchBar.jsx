import { Search, SlidersHorizontal } from "lucide-react";

function SearchBar({ value, onChange, onSubmit, compact = false, placeholder = "Search label designs" }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`surface flex items-center gap-3 rounded-[28px] border p-2 shadow-soft ${
        compact ? "" : "max-w-3xl"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
        <Search size={18} />
      </div>
      <input
        type="text"
        className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        type="submit"
        className="hidden rounded-full bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 sm:inline-flex"
      >
        <SlidersHorizontal size={16} className="mr-2" />
        Search
      </button>
    </form>
  );
}

export default SearchBar;
