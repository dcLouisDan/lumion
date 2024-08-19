import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Main from "@/components/Main";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
  title: "Lumion",
  description: "Illuminate your thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"w-full max-w-[1200px] mx-auto " + roboto.className}>
        <Main>
          <Header />
          {children}
        </Main>
      </body>
    </html>
  );
}
