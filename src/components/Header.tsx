import Link from "next/link";
import { Suspense } from "react";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { LuMountain } from "react-icons/lu";
import { getCart } from "~/server/api/cart";
import { getServerAuthSession } from "~/server/auth";
import HeaderCartLink from "./HeaderCartLink";
import UserInfo from "./UserInfo";
import { type User } from "~/types";

function Header({ user }: { user: User | null }) {
  return (
    <header className="item-center sticky top-0 z-10 flex w-full justify-between border-b border-gray-300 bg-white px-6 py-4 md:px-8 lg:px-10">
      <div className="m-auto flex w-full max-w-screen-2xl items-center justify-between gap-5">
        <Link
          href={"/"}
          className="flex shrink-0 items-center gap-2 text-lg font-bold"
        >
          <LuMountain size={24} />
          <span className="hidden md:block">Quik Shop</span>
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
            <UserInfoContainer />
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

async function UserInfoContainer() {
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

  return <UserInfo user={session.user} />;
}

async function CartLink({ user }: { user: User | null }) {
  const cartRes = await getCart();

  if (!cartRes.success) {
    return <HeaderCartLink cart={null} user={user} />;
  }

  return <HeaderCartLink cart={cartRes.cart ?? null} user={user} />;
}

export default Header;
