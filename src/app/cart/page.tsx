"use client";
import CartItem from "~/components/CartItem";
import CartSummarySection from "~/components/CartSummarySection";
import { useCartStore } from "~/lib/cartStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CartPageSkeleton from "./skeleton";
import { useUserStore } from "~/lib/userStore";
import { removeFromCart } from "~/server/api/cart";

export default function CartPage() {
  const user = useUserStore((state) => state.user);

  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.remoteItem);
  const changeQuantity = useCartStore((state) => state.handleQuantityChange);

  const [animationParent] = useAutoAnimate();

  function handleQuantityChange(productId: string, quantity: number) {
    changeQuantity(productId, quantity);
  }

  async function handleRemoveProduct(productId: string) {
    if (!user) {
      removeItem(productId, true);
      return;
    }

    removeItem(productId);
    await removeFromCart(productId);
  }

  if (!cart) {
    return <CartPageSkeleton />;
  }

  return (
    <main className="relative m-auto flex max-w-screen-xl flex-col items-center justify-center gap-10 px-6 py-10 md:flex-row md:items-start md:gap-8 md:px-8 lg:gap-20 lg:px-10">
      <ul
        ref={animationParent}
        className="flex max-w-full flex-col gap-6 overflow-hidden"
      >
        {cart.map((item) => (
          <CartItem
            key={item.productId}
            cartItem={item}
            handleQuantityChange={handleQuantityChange}
            handleRemoveProduct={handleRemoveProduct}
          />
        ))}
      </ul>
      <CartSummarySection />
    </main>
  );
}
