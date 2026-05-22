import { Heart, Download, Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppState } from "../hooks/useAppState";
import { useCart } from "../hooks/useCart";

function DesignCard({ design }) {
  const { savedDesignIds, toggleSaveDesign } = useAppState();
  const { addToCart } = useCart();
  const designId = design._id || design.id;
  const isSaved = savedDesignIds.includes(designId);
  const designerName = design.designer?.firstName
    ? `${design.designer.firstName} ${design.designer.lastName || ""}`.trim()
    : "Studio Upload";

  return (
    <article className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-950">
      <Link to={`/design/${designId}`} className="block overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img
            src={design.imageUrl}
            alt={design.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-800 opacity-0 transition group-hover:opacity-100">
            <Eye size={14} />
            Quick view
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              {design.title}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{designerName}</p>
          </div>
          <button
            type="button"
            onClick={() => toggleSaveDesign(designId)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
              isSaved
                ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-100"
                : "border-slate-200 text-slate-500 hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
            }`}
            aria-label="Save design"
          >
            <Heart size={18} className={isSaved ? "fill-current" : ""} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">{design.category}</span>
            <span className="inline-flex items-center gap-1">
              <Download size={14} />
              {design.downloads}
            </span>
          </div>
          <span className="text-lg font-semibold text-slate-950 dark:text-white">${design.price}</span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(design)}
          className="button-secondary w-full"
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default DesignCard;
