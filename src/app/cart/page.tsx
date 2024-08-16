"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import CartItem from "~/components/CartItem";
import CartSummarySection from "~/components/CartSummarySection";
import { useCartStore } from "~/lib/cartStore";
import { useUserStore } from "~/lib/userStore";
import {
  removeFromCart as removeFromCartApi,
  updateQuantity as updateQuantityApi,
} from "~/server/api/cart";
import CartPageSkeleton from "./skeleton";

export default function CartPage() {
  const user = useUserStore((state) => state.user);

  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.remoteItem);
  const changeQuantity = useCartStore((state) => state.handleQuantityChange);

  const [animationParent] = useAutoAnimate();

  async function handleQuantityChange(productId: string, quantity: number) {
    changeQuantity(productId, quantity, !user);

    if (user) {
      await updateQuantityApi(productId, quantity);
    }
  }

  async function handleRemoveProduct(productId: string) {
    removeItem(productId, !user);

    if (user) {
      await removeFromCartApi(productId);
    }
  }

  if (!cart) {
    return <CartPageSkeleton />;
  }

  return (
    <main className="relative m-auto flex max-w-screen-xl flex-col items-center justify-center gap-10 px-4 py-10 md:flex-row md:items-start md:gap-8 md:px-8 lg:gap-20 lg:px-10">
      {cart.length !== 0 && (
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
      )}
      {cart.length === 0 && (
        <div className="mt-5 w-[650px] max-w-full overflow-hidden text-lg">
          No Items in Cart. Checkout{" "}
          <Link className="inline font-medium underline" href="/">
            Products
          </Link>{" "}
          to add Items
        </div>
      )}

      <CartSummarySection />
    </main>
  );
}
