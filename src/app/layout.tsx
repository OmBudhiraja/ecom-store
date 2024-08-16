import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";
import UserProvider from "~/components/UserProvider";
import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "Quik Shop",
  description: "A simple e-commerce store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <UserProvider user={session?.user ?? null}>
          <Header user={session?.user ?? null} />
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
