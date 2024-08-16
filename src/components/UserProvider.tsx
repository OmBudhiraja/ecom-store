"use client";

import { type ReactNode, useEffect } from "react";
import { useUserStore } from "~/lib/userStore";
import { type User } from "~/types";

// hydrate the user store with the user data
export default function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
