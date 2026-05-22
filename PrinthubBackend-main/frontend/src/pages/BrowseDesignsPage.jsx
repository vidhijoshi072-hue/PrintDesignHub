import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DesignCard from "../components/DesignCard";
import FilterSidebar from "../components/FilterSidebar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageTransition from "../components/PageTransition";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { getDesigns } from "../services/designService";

const initialFilters = {
  category: "All",
  industry: "All",
  popularity: "Any",
  price: ["", ""]
};

function BrowseDesignsPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...initialFilters,
    category: searchParams.get("category") || "All"
  });
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadDesigns = async () => {
      setLoading(true);
      const result = await getDesigns(filters);
      setDesigns(result);
      setLoading(false);
    };

    loadDesigns();
  }, [filters]);

  const filteredDesigns = useMemo(() => {
    const search = debouncedQuery.toLowerCase();

    let next = designs.filter((design) => {
      const matchesSearch =
        !search ||
        [design.title, design.description, design.category, design.industry, ...(design.tags || [])]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search));

      const matchesIndustry = filters.industry === "All" || design.industry === filters.industry;

      return matchesSearch && matchesIndustry;
    });

    if (filters.popularity === "Most liked") {
      next = [...next].sort((a, b) => b.likes - a.likes);
    }

    if (filters.popularity === "Most downloaded") {
      next = [...next].sort((a, b) => b.downloads - a.downloads);
    }

    return next;
  }, [debouncedQuery, designs, filters.industry, filters.popularity]);

  return (
    <PageTransition>
      <section className="content-shell py-10 md:py-14">
        <div className="max-w-3xl">
          <span className="tag-pill">Marketplace</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Browse premium printed label designs
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Explore curated packaging assets with category, industry, price, and popularity filters.
          </p>
        </div>
        <div className="mt-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={(event) => event.preventDefault()}
            compact
          />
        </div>
      </section>

      <section className="content-shell grid gap-8 pb-10 lg:grid-cols-[290px_minmax(0,1fr)]">
        <FilterSidebar
          filters={filters}
          onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
          onReset={() => {
            setFilters(initialFilters);
            setQuery("");
          }}
        />

        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {Math.min(filteredDesigns.length, visibleCount)} of {filteredDesigns.length} designs
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredDesigns.length === 0 ? (
            <div className="surface rounded-[30px] p-10 text-center">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">No designs matched</h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Try broadening your search or resetting a few filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredDesigns.slice(0, visibleCount).map((design) => (
                  <DesignCard key={design._id || design.id} design={design} />
                ))}
              </div>
              {visibleCount < filteredDesigns.length ? (
                <div className="mt-10 flex justify-center">
                  <button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="button-secondary">
                    Load more
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default BrowseDesignsPage;
