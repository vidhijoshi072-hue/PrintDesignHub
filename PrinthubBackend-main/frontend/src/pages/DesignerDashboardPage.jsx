import { BarChart3, DollarSign, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import { useAppState } from "../hooks/useAppState";
import { designerSales } from "../services/mockData";

function DesignerDashboardPage() {
  const { designerUploads, removeUploadedDesign } = useAppState();
  const totalSales = designerSales.reduce((sum, item) => sum + item.sales, 0);

  return (
    <PageTransition>
      <section className="content-shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <DashboardSidebar role="designer" />

          <div className="space-y-8">
            <div>
              <span className="tag-pill">Designer dashboard</span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Manage listings and track marketplace sales
              </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { label: "Total sales", value: `$${totalSales.toLocaleString()}`, icon: DollarSign },
                { label: "Active uploads", value: designerUploads.length, icon: BarChart3 },
                { label: "Marketplace views", value: "18.4k", icon: Eye }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="surface rounded-[28px] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                      <Icon size={20} />
                    </div>
                    <p className="mt-6 text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="surface rounded-[30px] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Recent sales</h2>
                <Link to="/upload" className="button-primary">
                  Upload new design
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-5">
                {designerSales.map((item) => (
                  <div key={item.month} className="rounded-[24px] border border-slate-200 p-4 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.month}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">${item.sales}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface rounded-[30px] p-6">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Manage designs</h2>
              <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-800">
                <div className="hidden grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr] gap-4 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-400 md:grid">
                  <p>Design</p>
                  <p>Category</p>
                  <p>Price</p>
                  <p>Action</p>
                </div>
                <div>
                  {designerUploads.map((design) => (
                    <div
                      key={design._id || design.id}
                      className="grid gap-4 border-t border-slate-200 px-5 py-4 first:border-t-0 md:grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr] md:items-center dark:border-slate-800"
                    >
                      <div className="flex items-center gap-4">
                        <img src={design.imageUrl} alt={design.title} className="h-14 w-16 rounded-2xl object-cover" />
                        <div>
                          <p className="font-medium text-slate-950 dark:text-white">{design.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{design.likes} likes</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{design.category}</p>
                      <p className="text-sm font-medium text-slate-950 dark:text-white">${design.price}</p>
                      <div className="flex gap-3">
                        <Link to={`/design/${design._id || design.id}`} className="button-secondary px-4 py-2">
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeUploadedDesign(design._id || design.id)}
                          className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/20 dark:hover:bg-rose-500/10"
                        >
                          <Trash2 size={15} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default DesignerDashboardPage;
