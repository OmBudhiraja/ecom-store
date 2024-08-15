import Link from "next/link";
import { LuMountain } from "react-icons/lu";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { getServerAuthSession } from "~/server/auth";
import { Suspense } from "react";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { getCart } from "~/server/api/cart";
import { type Session } from "next-auth";
import HeaderCartLink from "./HeaderCartLink";

function Header({ user }: { user: Session["user"] | null }) {
  return (
    <header className="item-center sticky top-0 z-10 flex w-full justify-between border-b border-gray-300 bg-white px-6 py-4 md:px-8 lg:px-10">
      <div className="m-auto flex w-full max-w-screen-2xl items-center justify-between gap-5">
        <Link
          href={"/"}
          className="flex shrink-0 items-center gap-2 text-lg font-bold"
        >
          <LuMountain size={24} />
          <span className="hidden md:block">Ecom Store</span>
        </Link>
        <div className="relative max-w-md flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-md border py-2 pl-10 pr-4 focus:border-zinc-700 focus:outline-none focus:ring-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Suspense fallback={<div>Loading..</div>}>
            <UserInfo />
          </Suspense>
          <Suspense
            fallback={
              <Link className="relative px-2 py-1" href={"/cart"}>
                {" "}
                <CartIcon size={26} />
              </Link>
            }
          >
            <CartLink user={user} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

async function UserInfo() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <Link
        className="text-base font-medium hover:underline"
        href={"/api/auth/signin"}
      >
        Login
      </Link>
    );
  }

  return <div></div>;
}

async function CartLink({ user }: { user: Session["user"] | null }) {
  const cartRes = await getCart();

  return <HeaderCartLink cart={cartRes.cart ?? null} user={user} />;
}

export default Header;
