import Image from "next/image";
import { IoMdClose as RemoveIcon } from "react-icons/io";
import { LuPlus as AddIcon, LuMinus as SubtractIcon } from "react-icons/lu";
import { type Cart } from "~/types";
import { formatePriceForCurrency } from "~/utils/utils";

interface CartItemProps {
  cartItem: Cart[number];
  handleQuantityChange: (productId: string, quantity: number) => void;
  handleRemoveProduct: (productId: string) => void;
}

function CartItem({
  cartItem,
  handleQuantityChange,
  handleRemoveProduct,
}: CartItemProps) {
  return (
    <div className="flex w-[650px] max-w-full flex-col items-center justify-between gap-7 rounded-lg border p-4 shadow-sm sm:flex-row md:gap-4 md:p-2 lg:gap-7 lg:p-4">
      <div className="flex items-center gap-3.5">
        <div className="h-[100px] w-[100px] shrink-0 rounded-md">
          <Image
            src={cartItem.thumbnail}
            alt={cartItem.name}
            width={100}
            height={100}
            className="aspect-square rounded-md object-contain"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="line-clamp-2 text-[15px] font-medium">
            {cartItem.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-semibold md:text-base lg:text-lg">
              {formatePriceForCurrency(cartItem.discountedPrice)}
            </span>
            {cartItem.discountedPrice !== cartItem.originalPrice && (
              <span className="text-zinc-400 line-through">
                {formatePriceForCurrency(cartItem.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3.5 md:gap-2">
        <button
          disabled={cartItem.quantity === 1}
          onClick={() =>
            handleQuantityChange(cartItem.productId, cartItem.quantity - 1)
          }
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm outline-offset-4 outline-zinc-900 transition-colors hover:bg-zinc-100 active:bg-zinc-100 disabled:cursor-not-allowed md:h-7 md:w-7 lg:h-10 lg:w-10"
        >
          <SubtractIcon />
        </button>
        <span className="min-w-3 text-center">{cartItem.quantity}</span>
        <button
          onClick={() =>
            handleQuantityChange(cartItem.productId, cartItem.quantity + 1)
          }
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm outline-offset-4 outline-zinc-900 transition-colors hover:bg-zinc-100 active:bg-zinc-100 disabled:cursor-not-allowed md:h-7 md:w-7 lg:h-10 lg:w-10"
        >
          <AddIcon />
        </button>
        <button
          onClick={() => handleRemoveProduct(cartItem.productId)}
          className="lg:ml-2 lg:p-2"
        >
          <RemoveIcon size={18} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
