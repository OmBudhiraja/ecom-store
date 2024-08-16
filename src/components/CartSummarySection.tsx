import { useMemo, useState } from "react";
import { useCartStore } from "~/lib/cartStore";
import { formatePriceForCurrency } from "~/utils/utils";
import { RiDiscountPercentFill as CouponIcon } from "react-icons/ri";
import { BsTruck as DeliveryIcon } from "react-icons/bs";
import toast from "react-hot-toast";

function CartSummarySection() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useCartStore((state) => state.cart) ?? [];
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.quantity * item.originalPrice;
    }, 0);
  }, [items]);

  const discount = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.quantity * (item.originalPrice - item.discountedPrice);
    }, 0);
  }, [items]);

  const finalTotal = useMemo(() => {
    const total = subtotal - discount;
    return isCouponApplied ? total * 0.9 : total;
  }, [subtotal, discount, isCouponApplied]);

  const couponDiscount = isCouponApplied ? (subtotal - discount) * 0.1 : 0;

  const handleApplyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCouponApplied(true);
  };

  return (
    <div className="top-24 h-fit w-[350px] shrink-0 rounded-lg border p-6 shadow-sm md:sticky md:w-80 lg:w-[350px]">
      <h2 className="text-xl font-medium">Cart Summary</h2>
      <div className="mt-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatePriceForCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="text-green-500">
            {formatePriceForCurrency(-discount)}
          </span>
        </div>

        {isCouponApplied && (
          <div className="flex items-center justify-between">
            <span>Coupon</span>
            <span className="text-green-500">
              {formatePriceForCurrency(-couponDiscount)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            Delivery <DeliveryIcon />
          </span>
          <span className="text-green-500">Free</span>
        </div>

        {!isCouponApplied && (
          <form
            onSubmit={handleApplyCoupon}
            className="flex items-center gap-2 py-1"
          >
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full rounded-md border px-3 py-1.5 text-sm"
              required
              minLength={3}
            />
            <button className="rounded-md border px-2 py-1.5 text-sm">
              Apply
            </button>
          </form>
        )}

        {isCouponApplied && (
          <div className="flex items-center justify-between rounded-md border p-2">
            <div className="flex items-center gap-2">
              <CouponIcon className="text-orange-500" />
              <p>
                <span className="font-semibold">
                  &ldquo;{couponCode}&rdquo;&nbsp;
                </span>
                Applied
              </p>
            </div>
            <button
              onClick={() => {
                setIsCouponApplied(false);
                setCouponCode("");
              }}
              className="text-sm font-medium text-neutral-600"
            >
              Remove
            </button>
          </div>
        )}
        <hr />
        <div className="flex items-center justify-between text-xl font-medium">
          <span>Total Amount</span>
          <span>{formatePriceForCurrency(finalTotal)}</span>
        </div>
        <button
          onClick={() => {
            if (items.length === 0) {
              return toast.error("Cart is empty!");
            }

            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: "Processing order...",
              success: "Order placed successfully!",
              error: "Something went wrong!",
            });
          }}
          className="mt-2 flex w-full items-center justify-center rounded-md bg-zinc-900 px-3 py-2.5 text-white"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartSummarySection;
