"use client";

import { type Session } from "next-auth";
import { type ReactNode, useEffect } from "react";
import { useUserStore } from "~/lib/userStore";

export default function UserProvider({
  user,
  children,
}: {
  user: Session["user"] | null;
  children: ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
