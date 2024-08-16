"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import { useEffect } from "react";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { useCartStore } from "~/lib/cartStore";
import { type Cart } from "~/types";

function HeaderCartLink({
  cart: initialCart,
  user,
}: {
  cart: Cart | null;
  user: Session["user"] | null;
}) {
  const cart = useCartStore((state) => state.cart);
  const initCart = useCartStore((state) => state.initCart);
  const hydrateFromLocalStoreage = useCartStore(
    (state) => state.hydrateFromLocalStoreage,
  );

  useEffect(() => {
    if (!user) {
      hydrateFromLocalStoreage();
      return;
    }

    initCart(initialCart ?? []);
  }, [initialCart, initCart, user, hydrateFromLocalStoreage]);

  return (
    <Link href="/cart" className="relative px-2 py-1">
      <CartIcon size={26} />
      {cart && cart.length > 0 && (
        <span className="absolute -right-1 -top-2 flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-900 p-1 text-sm text-white">
          {cart.length}
        </span>
      )}
    </Link>
  );
}
export default HeaderCartLink;
