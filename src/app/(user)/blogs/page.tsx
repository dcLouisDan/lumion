import { Chip, Paper, Typography } from "@mui/material";
import React from "react";
import { BlogsPageFeed } from "@/components/BlogsPageFeed";
import { brandFont } from "@/lib/theme";

export default async function BlogsPage() {


  return (
    <div className="flex flex-col gap-12 px-8">
      <Typography
        variant="h4"
        className={"text-center text-4xl sm:text-6xl " + brandFont.className}
      >
        Browse blogs
      </Typography>
      <BlogsPageFeed />
    </div>
  );
}
