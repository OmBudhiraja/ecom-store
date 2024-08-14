"use client";
import CartItem from "~/components/CartItem";
import CartSummarySection from "~/components/CartSummarySection";
import { useCartStore } from "~/lib/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);

  if (!cart) {
    return <div>loading...</div>;
  }

  return (
    <main className="relative m-auto flex max-w-screen-xl justify-center gap-20 p-10">
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <CartItem key={item.productId} cartItem={item} />
        ))}
      </div>
      <CartSummarySection />
    </main>
  );
}
