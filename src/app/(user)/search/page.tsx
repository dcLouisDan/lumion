import React from "react";
import SearchResultsFeed from "@/components/SearchResultsFeed";
import { Pagination } from "@mui/material";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl sm:text-2xl">
        Search Results for: <span className="font-bold">{search}</span>
      </h1>
      <SearchResultsFeed search={search} />
    </div>
  );
}
