import React from "react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  return <div>{searchParams.search}</div>;
}
