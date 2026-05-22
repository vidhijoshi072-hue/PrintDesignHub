import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <article className="surface rounded-[28px] p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <img src={item.image} alt={item.title} className="h-28 w-full rounded-[22px] object-cover md:w-36" />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.designer}</p>
          <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">${item.price}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onQuantityChange(item.designId, item.quantity - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-slate-950 dark:text-white">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.designId, item.quantity + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onRemove(item.designId)}
          className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/20 dark:hover:bg-rose-500/10"
        >
          <Trash2 size={15} className="mr-2" />
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
