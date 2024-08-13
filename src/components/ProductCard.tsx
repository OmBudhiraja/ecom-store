"use client";
import Image from "next/image";
import { FaStar as StarIcon } from "react-icons/fa";
import { type Product } from "~/server/db/schema";
import { formatePriceForCurrency } from "~/utils/utils";

interface ProductCardProps {
  product: Product;
  handleAddToCart: (product: Product) => void;
}

function ProductCard({ product, handleAddToCart }: ProductCardProps) {
  return (
    <div className="flex w-[300px] flex-col gap-4 overflow-hidden rounded-lg shadow-xl">
      <Image
        src={product.thumbnail}
        alt={product.name}
        width={300}
        height={300}
        className="aspect-square object-contain"
      />
      <div className="flex flex-col gap-2 p-4">
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
          <span className="text-zinc-400 line-through">
            {formatePriceForCurrency(product.originalPrice)}
          </span>
        </div>
        <button
          onClick={() => handleAddToCart(product)}
          className="focus-visible:ring-ring text- mt-3 flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 font-medium text-white outline-none transition-colors hover:bg-zinc-900/90 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
