import { brandFont } from "@/lib/theme";
import React from "react";

export default function AboutPage() {
  return (
    <div>
      <div
        className={brandFont.className + " text-2xl sm:text-4xl text-center"}
      >
        About Me
      </div>
    </div>
  );
}
