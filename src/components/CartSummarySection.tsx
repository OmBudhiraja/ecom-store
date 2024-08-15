import { useMemo, useState } from "react";
import { useCartStore } from "~/lib/cartStore";
import { formatePriceForCurrency } from "~/utils/utils";
import { RiDiscountPercentFill as CouponIcon } from "react-icons/ri";

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
    <div className="top-24 h-fit w-80 shrink-0 rounded-lg border p-6 shadow-sm md:sticky">
      <h2 className="text-xl font-medium">Cart Summary</h2>
      <div className="mt-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatePriceForCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span>{formatePriceForCurrency(-discount)}</span>
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
          <div className="flex items-center justify-between">
            <span>Coupon</span>
            <span>{formatePriceForCurrency(-couponDiscount)}</span>
          </div>
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
        <div className="mt-1 flex items-center justify-between text-xl font-semibold">
          <span>Grand Total</span>
          <span>{formatePriceForCurrency(finalTotal)}</span>
        </div>
        <button className="mt-4 flex w-full items-center justify-center rounded-md bg-zinc-900 px-3 py-2.5 text-white">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartSummarySection;
