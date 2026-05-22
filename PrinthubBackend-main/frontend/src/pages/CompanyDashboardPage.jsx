import DashboardSidebar from "../components/DashboardSidebar";
import DesignCard from "../components/DesignCard";
import PageTransition from "../components/PageTransition";
import { useAppState } from "../hooks/useAppState";
import { mockDesigns } from "../services/mockData";

function CompanyDashboardPage() {
  const { savedDesignIds, purchasedDesignIds, companyOrders } = useAppState();
  const savedDesigns = mockDesigns.filter((design) => savedDesignIds.includes(design._id));
  const purchasedDesigns = mockDesigns.filter((design) => purchasedDesignIds.includes(design._id));

  return (
    <PageTransition>
      <section className="content-shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <DashboardSidebar role="company" />
          <div className="space-y-8">
            <div>
              <span className="tag-pill">Company dashboard</span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Saved collections, purchases, and order history
              </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="surface rounded-[28px] p-6">
                <p className="text-3xl font-semibold text-slate-950 dark:text-white">{savedDesigns.length}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Saved designs</p>
              </div>
              <div className="surface rounded-[28px] p-6">
                <p className="text-3xl font-semibold text-slate-950 dark:text-white">{purchasedDesigns.length}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Purchased designs</p>
              </div>
              <div className="surface rounded-[28px] p-6">
                <p className="text-3xl font-semibold text-slate-950 dark:text-white">{companyOrders.length}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Orders completed</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Saved designs</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {savedDesigns.map((design) => (
                  <DesignCard key={design._id} design={design} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Purchased designs</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {purchasedDesigns.map((design) => (
                  <DesignCard key={design._id} design={design} />
                ))}
              </div>
            </div>

            <div className="surface rounded-[30px] p-6">
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Order history</h2>
              <div className="mt-6 space-y-3">
                {companyOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 rounded-[24px] border border-slate-200 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-slate-950 dark:text-white">{order.id}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        {order.status}
                      </span>
                      <span className="text-lg font-semibold text-slate-950 dark:text-white">${order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default CompanyDashboardPage;
