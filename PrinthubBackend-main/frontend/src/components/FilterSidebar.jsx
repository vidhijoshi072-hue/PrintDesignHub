const filterGroups = {
  category: ["All", "Food", "Cosmetics", "Pharma", "Beverage", "Retail", "Wellness"],
  industry: ["All", "FMCG", "Beauty", "Healthcare", "Beverage", "Lifestyle", "Wellness"],
  popularity: ["Any", "Most liked", "Most downloaded", "Newest"]
};

function FilterSidebar({ filters, onChange, onReset }) {
  return (
    <aside className="surface h-fit rounded-[28px] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Filters</h2>
        <button type="button" onClick={onReset} className="text-sm font-medium text-brand-700">
          Reset
        </button>
      </div>

      <div className="mt-6 space-y-8">
        {Object.entries(filterGroups).map(([key, values]) => (
          <div key={key}>
            <p className="mb-3 text-sm font-semibold capitalize text-slate-700 dark:text-slate-200">
              {key}
            </p>
            <div className="space-y-2">
              {values.map((value) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <span>{value}</span>
                  <input
                    type="radio"
                    name={key}
                    checked={filters[key] === value}
                    onChange={() => onChange(key, value)}
                    className="h-4 w-4 accent-[#2563EB]"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Price range</p>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              className="input-base"
              placeholder="Min"
              value={filters.price[0]}
              onChange={(event) => onChange("price", [event.target.value, filters.price[1]])}
            />
            <input
              type="number"
              className="input-base"
              placeholder="Max"
              value={filters.price[1]}
              onChange={(event) => onChange("price", [filters.price[0], event.target.value])}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
