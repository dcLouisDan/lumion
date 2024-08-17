import { Anton } from "next/font/google";
import React from "react";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  return (
    <div className={anton.className + " text-4xl py-4 text-rose-700"}>
      Lumion
    </div>
  );
}
