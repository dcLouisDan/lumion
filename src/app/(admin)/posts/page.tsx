import PostsTable from "@/components/PostsTable";
import { brandFont } from "@/lib/theme";
import React from "react";

export default async function PostsPage() {
  return (
    <div>
      <h1 className={brandFont.className + " text-3xl mb-5"}>Manage Posts</h1>
      <div>
        <PostsTable />
      </div>
    </div>
  );
}
