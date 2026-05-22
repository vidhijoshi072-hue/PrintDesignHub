import { useAppState } from "./useAppState";

export function useCart() {
  const { cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart } = useAppState();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    itemCount,
    totalPrice
  };
}
