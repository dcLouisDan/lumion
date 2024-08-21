import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Main from "@/components/Main";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Lumion",
  description: "Illuminate your thoughts",
};

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
          "w-full max-w-[1200px] mx-auto flex flex-col h-screen " +
          roboto.className
        }
      >
        <AuthProvider>
          <Main>
            <Header authUser={authUser} />
            {children}
          </Main>
        </AuthProvider>
      </body>
    </html>
  );
}
