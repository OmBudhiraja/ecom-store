"use client";
import Image from "next/image";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { BiLoaderAlt as SpinnerIcon } from "react-icons/bi";
import { FaStar as StarIcon } from "react-icons/fa";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { LuShoppingBag as AddedCartIcon } from "react-icons/lu";
import { useCartStore } from "~/lib/cartStore";
import { useUserStore } from "~/lib/userStore";
import { addToCart } from "~/server/api/cart";
import { type Product } from "~/server/db/schema";
import { formatePriceForCurrency } from "~/utils/utils";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isPending, startTransition] = useTransition();
  const [showTransition, setShowTransition] = useState(false);

  const setCart = useCartStore((state) => state.setCart);
  const addItem = useCartStore((state) => state.addItem);

  const user = useUserStore((state) => state.user);

  async function handleAddToCart() {
    if (!user) {
      addItem(
        {
          name: product.name,
          productId: product.id,
          quantity: 1,
          originalPrice: product.originalPrice,
          discountedPrice: product.discountedPrice,
          thumbnail: product.thumbnail,
        },
        true,
      );
      toast.success("Added to cart");

      setShowTransition(true);
      setTimeout(() => setShowTransition(false), 1500);

      return;
    }

    startTransition(async () => {
      const res = await addToCart([{ productId: product.id, quantity: 1 }]);

      if (!res.success || !res.cart) {
        toast.error(res.message ?? "Something went wrong!");
      } else {
        setCart(res.cart);
      }

      toast.success("Added to cart");

      setShowTransition(true);
      setTimeout(() => setShowTransition(false), 1500);
    });
  }

  return (
    <div className="flex w-[300px] flex-col gap-4 overflow-hidden rounded-lg shadow-xl">
      <div className="relative flex h-[300px] items-center justify-center overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={300}
          height={300}
          className="block h-auto max-h-full w-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-2.5 p-4">
        <h3 className="line-clamp-1 text-lg font-medium capitalize text-zinc-600">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex w-fit items-center gap-1.5 rounded bg-green-600 px-2.5 py-1 text-xs text-white">
            4.2
            <StarIcon size={11} />
          </div>
          <span className="text-sm font-medium text-gray-400"> (1,76,161)</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xl font-semibold">
            {formatePriceForCurrency(product.discountedPrice)}
          </span>
          {product.discountedPrice !== product.originalPrice && (
            <span className="text-zinc-400 line-through">
              {formatePriceForCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isPending || showTransition}
          className="focus-visible:ring-ring text- relative mt-3 w-full rounded-md bg-zinc-900 px-4 py-3 font-medium text-white outline-none transition-colors hover:bg-zinc-900/90 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-90"
        >
          <div
            style={{ visibility: isPending ? "hidden" : "visible" }}
            className="flex w-full items-center justify-center gap-2"
          >
            {showTransition ? (
              <AddedCartIcon size={18} className="animate-scale" />
            ) : (
              <CartIcon size={18} />
            )}
            {showTransition ? "Added to cart" : "Add to cart"}
          </div>
          {isPending && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <SpinnerIcon className="h-5 w-5 animate-spin" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
