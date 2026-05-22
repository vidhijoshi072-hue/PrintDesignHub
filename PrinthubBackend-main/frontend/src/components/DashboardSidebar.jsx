import { LayoutDashboard, Package, ShoppingCart, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";

function DashboardSidebar({ role = "designer" }) {
  const items =
    role === "designer"
      ? [
          { label: "Overview", to: "/designer-dashboard", icon: LayoutDashboard },
          { label: "Uploads", to: "/upload", icon: Upload },
          { label: "Sales", to: "/designer-dashboard", icon: Package }
        ]
      : [
          { label: "Overview", to: "/company-dashboard", icon: LayoutDashboard },
          { label: "Saved", to: "/company-dashboard", icon: Package },
          { label: "Orders", to: "/company-dashboard", icon: ShoppingCart }
        ];

  return (
    <aside className="surface h-fit rounded-[30px] p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {role === "designer" ? "Designer" : "Company"} workspace
        </p>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-[#9a3412] dark:bg-stone-900 dark:text-amber-100"
                    : "text-stone-600 hover:bg-white dark:text-stone-300 dark:hover:bg-stone-900"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

export default DashboardSidebar;
