import React from "react";

function ProductCardSkeleton() {
  return (
    <div className="flex w-[300px] animate-pulse flex-col gap-4 overflow-hidden rounded-lg shadow-xl">
      <div className="aspect-square bg-gray-200"></div>
      <div className="mt-2 flex flex-col gap-2 p-4">
        <div className="h-6 w-3/4 rounded bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="flex w-12 items-center gap-1.5 rounded bg-gray-200 px-3 py-3"></div>
          <span className="h-4 w-1/4 rounded bg-gray-200"></span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-7 w-1/4 rounded bg-gray-200"></span>
        </div>
        <button className="mt-3 flex w-full items-center justify-center rounded-md bg-gray-200 px-4 py-2.5 font-medium text-transparent">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
