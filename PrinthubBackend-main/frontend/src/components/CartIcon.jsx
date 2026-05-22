import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbc0aa] bg-[#fff8f1] text-[#5b3a2b] transition hover:border-[#b98869] hover:text-[#7a4328] dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
      aria-label="Open cart"
    >
      <ShoppingCart size={18} />
      {itemCount ? (
        <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[11px] font-semibold text-white">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}

export default CartIcon;
