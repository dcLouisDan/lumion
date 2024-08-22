import { brandFont } from "@/lib/theme";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="py-16 text-center flex flex-col gap-4">
      <h1
        className={
          brandFont.className +
          " text-5xl text-gray-900 border-t-2 w-fit mx-auto border-gray-900 border-b-2 py-20 px-10"
        }
      >
        "A personal canvas of <br /> thoughts and emotions."
      </h1>
    </div>
  );
}
