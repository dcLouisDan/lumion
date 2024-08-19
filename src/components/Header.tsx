import { Button } from "@mui/material";
import { Anton } from "next/font/google";
import React from "react";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  return (
    <header className="flex py-4">
      <div className={anton.className + " text-4xl text-rose-700 flex-1"}>
        Lumion
      </div>
      <div className="flex gap-2">
        <Button variant="contained" disableElevation>
          Login
        </Button>
        <Button variant="outlined" disableElevation>
          Sign-up
        </Button>
      </div>
    </header>
  );
}
