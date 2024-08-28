import type { Metadata } from "next";
import { Shantell_Sans } from "next/font/google";
import Header from "@/components/Header";
import Main from "@/components/Main";
import "../globals.css";
import AuthProvider from "../context/AuthProvider";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import "@fontsource/shantell-sans";
import "@fontsource/shantell-sans/400.css";
import "@fontsource/shantell-sans/500.css";
import "@fontsource/shantell-sans/700.css";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
const baseFont = Shantell_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Introverted Ink",
  description: "Illuminate your thoughts",
};

function UnauthorizedLayout({ children }: { children: ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  const authUser = session?.user;

  return (
    <html lang="en">
      <body
        className={
          "w-full max-w-[1400px] mx-auto flex flex-col h-screen " +
          baseFont.className
        }
      >
        <AuthProvider>
          <Main>
            <Header authUser={authUser} />
            <UnauthorizedLayout children={children} />
            <Footer />
          </Main>
        </AuthProvider>
      </body>
    </html>
  );
}
