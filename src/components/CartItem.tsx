import Image from "next/image";
import { type Cart } from "~/types";
import { formatePriceForCurrency } from "~/utils/utils";
import { IoMdClose as RemoveIcon } from "react-icons/io";
import { LuPlus as AddIcon } from "react-icons/lu";
import { LuMinus as SubtractIcon } from "react-icons/lu";

function CartItem({ cartItem }: { cartItem: Cart[number] }) {
  return (
    <div className="flex max-w-2xl items-center justify-between gap-7 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center gap-3.5">
        <Image
          src={cartItem.thumbnail}
          alt={cartItem.name}
          width={100}
          height={100}
          className="aspect-square rounded-md object-contain"
        />
        <div>
          <h3 className="line-clamp-2 text-[15px] font-medium">
            {cartItem.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-semibold">
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

      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm outline-offset-4 outline-zinc-900 transition-colors hover:bg-zinc-100 focus:bg-zinc-100 disabled:cursor-not-allowed">
          <SubtractIcon />
        </button>
        <span className="w-3 text-center">{cartItem.quantity}</span>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm outline-offset-4 outline-zinc-900 transition-colors hover:bg-zinc-100 focus:bg-zinc-100 disabled:cursor-not-allowed">
          <AddIcon />
        </button>
        <button className="ml-2 p-2">
          <RemoveIcon size={18} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
