"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";
import { IoPersonSharp as AvatarIcon } from "react-icons/io5";
import { type User } from "~/types";

const UserInfo = ({ user }: { user: User }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex h-[35px] w-[35px] items-center justify-center overflow-hidden rounded-full bg-gray-200 outline-offset-2 focus:outline"
          aria-label="Profile menu"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              className="h-full w-full rounded-full object-cover"
              alt=""
            />
          ) : (
            <AvatarIcon size={20} />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="data-[side=bottom]:animate-slideUpAndFade z-50 min-w-[220px] rounded-md border-t bg-white p-1.5 shadow-md will-change-[opacity,transform]"
          sideOffset={12}
          side="bottom"
          align="end"
        >
          <DropdownMenu.Item className="group relative flex h-7 select-none items-center px-[5px] pl-[25px] text-sm leading-none outline-none">
            {user.name}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-200" />
          <DropdownMenu.Item
            asChild
            className="group relative flex h-8 select-none items-center px-[5px] pl-[25px] text-sm leading-none outline-none"
          >
            <button
              className="w-full rounded-md hover:bg-gray-200"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserInfo;
