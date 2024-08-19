import { Button } from "@mui/material";
import { Anton } from "next/font/google";
import Link from "next/link";
import React from "react";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
export default function Hero() {
  return (
    <div className="py-16 text-center flex flex-col gap-4">
      <h1 className={anton.className + " text-7xl text-rose-700"}>Lumion</h1>
      <p className="text-2xl font-semibold">Illuminate your thoughts.</p>
      <Link href="/login">
        <Button
          variant="contained"
          disableElevation
          className="mx-auto"
          size="large"
          fullWidth={false}
        >
          Start Blogging
        </Button>
      </Link>
    </div>
  );
}
