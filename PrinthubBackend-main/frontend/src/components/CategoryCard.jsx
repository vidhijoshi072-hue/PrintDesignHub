import {
  Cookie,
  CupSoda,
  Leaf,
  ShieldPlus,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  Cookie,
  Sparkles,
  ShieldPlus,
  CupSoda,
  ShoppingBag,
  Leaf
};

function CategoryCard({ category }) {
  const Icon = iconMap[category.icon] || ShoppingBag;

  return (
    <Link
      to={`/browse?category=${encodeURIComponent(category.name)}`}
      className="group rounded-[28px] border border-slate-200 bg-gradient-to-br p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card dark:border-slate-800"
    >
      <div className={`rounded-[24px] bg-gradient-to-br ${category.color} p-5 dark:from-slate-900 dark:to-slate-800`}>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-slate-900 shadow-sm">
          <Icon size={22} />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{category.name}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{category.count}+ design packs</p>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
