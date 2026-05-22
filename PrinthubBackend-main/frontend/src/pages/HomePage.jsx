import { ArrowRight, BadgeCheck, Building2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import DesignCard from "../components/DesignCard";
import PageTransition from "../components/PageTransition";
import SearchBar from "../components/SearchBar";
import { categories, mockDesigns } from "../services/mockData";

function HomePage() {
  const [query, setQuery] = useState("");
  const featured = mockDesigns.slice(0, 4);
  const trending = [...mockDesigns].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <PageTransition>
      <section className="content-shell pt-10 md:pt-16">
        <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-white/80 px-6 py-10 shadow-soft dark:border-slate-800 dark:bg-slate-950/80 md:px-10 md:py-14">
          <div className="absolute inset-0 bg-hero-grid" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="tag-pill">Marketplace for Professional Printed Label Designs</span>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
                Discover High-Quality Label Designs for Your Products
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
                PrintDesignHub connects production-focused designers with companies that need
                polished packaging assets across food, cosmetics, pharma, and beverage.
              </p>
              <div className="mt-8">
                <SearchBar
                  value={query}
                  onChange={setQuery}
                  onSubmit={(event) => event.preventDefault()}
                  placeholder="Search artisan honey, serum labels, cold brew wraps..."
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/browse" className="button-primary">
                  Explore Marketplace
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link to="/signup" className="button-secondary">
                  Start Selling
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="surface rounded-[24px] p-4">
                  <p className="text-2xl font-semibold text-slate-950 dark:text-white">12k+</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Label assets listed</p>
                </div>
                <div className="surface rounded-[24px] p-4">
                  <p className="text-2xl font-semibold text-slate-950 dark:text-white">780+</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Active designers</p>
                </div>
                <div className="surface rounded-[24px] p-4">
                  <p className="text-2xl font-semibold text-slate-950 dark:text-white">96%</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Repeat buyers</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featured.slice(0, 2).map((design, index) => (
                <div
                  key={design._id}
                  className={`surface overflow-hidden rounded-[28px] p-3 ${index === 1 ? "sm:mt-8" : ""}`}
                >
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="h-56 w-full rounded-[22px] object-cover"
                  />
                  <div className="p-3">
                    <p className="text-base font-semibold text-slate-950 dark:text-white">{design.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">${design.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell mt-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="tag-pill">Categories</p>
            <h2 className="section-title mt-4">Built for real packaging verticals</h2>
            <p className="section-copy">
              Discover curated label systems for fast-moving consumer goods, wellness, regulated
              packaging, and more.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      <section className="content-shell mt-20">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="tag-pill">Featured designs</p>
            <h2 className="section-title mt-4">Featured professional label designs</h2>
          </div>
          <Link to="/browse" className="button-secondary">
            Browse Designs
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((design) => (
            <DesignCard key={design._id} design={design} />
          ))}
        </div>
      </section>

      <section className="content-shell mt-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface rounded-[32px] p-8">
          <p className="tag-pill">Why teams choose us</p>
          <div className="mt-8 space-y-6">
            {[
              {
                icon: BadgeCheck,
                title: "Production-ready curation",
                copy: "Packaging assets are organized around real manufacturing workflows, not generic inspiration boards."
              },
              {
                icon: Building2,
                title: "Company-first sourcing",
                copy: "Procurement teams can compare categories, pricing, popularity, and related concepts in one flow."
              },
              {
                icon: TrendingUp,
                title: "Designed for growth",
                copy: "Freelancers and studios get dashboards for uploads, sales visibility, and portfolio management."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="surface rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="tag-pill">Trending this week</p>
              <h2 className="section-title mt-4">High-performing design drops</h2>
            </div>
            <TrendingUp className="text-brand-700" />
          </div>
          <div className="mt-8 space-y-4">
            {trending.map((design) => (
              <div
                key={design._id}
                className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center"
              >
                <img src={design.imageUrl} alt={design.title} className="h-24 w-full rounded-[18px] object-cover sm:w-36" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-slate-950 dark:text-white">{design.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{design.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{design.likes} likes</p>
                  <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">${design.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell mt-20">
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-brand-700 via-brand-500 to-accent px-8 py-10 text-white md:px-12 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Start selling</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Upload your label portfolio and reach packaging buyers globally.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
                Designers get polished listing pages, portfolio-style presentation, and a dedicated
                dashboard to manage assets and track sales.
              </p>
            </div>
            <Link to="/signup" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700">
              Start Selling
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default HomePage;
