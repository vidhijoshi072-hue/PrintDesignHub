import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PageTransition from "../components/PageTransition";
import { useCart } from "../hooks/useCart";

function Cart() {
  const { cartItems, removeFromCart, updateCartQuantity, clearCart, totalPrice, itemCount } = useCart();

  return (
    <PageTransition>
      <section className="content-shell py-10 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <span className="tag-pill">Shopping cart</span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Review your selected label designs
            </h1>

            {cartItems.length ? (
              <>
                <div className="mt-8 space-y-5">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.designId}
                      item={item}
                      onRemove={removeFromCart}
                      onQuantityChange={updateCartQuantity}
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <button type="button" onClick={clearCart} className="button-secondary">
                    Clear cart
                  </button>
                </div>
              </>
            ) : (
              <div className="surface mt-8 rounded-[30px] p-10 text-center">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Your cart is empty</h2>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Browse the marketplace and add label designs for later purchase.
                </p>
                <Link to="/browse" className="button-primary mt-6">
                  Browse Designs
                </Link>
              </div>
            )}
          </div>

          <aside className="surface h-fit rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-950 dark:border-slate-800 dark:text-white">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button type="button" className="button-primary mt-6 w-full" disabled={!cartItems.length}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}

export default Cart;
