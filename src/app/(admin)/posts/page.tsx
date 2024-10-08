import { options } from "@/app/api/auth/[...nextauth]/options";
import PostsTable from "@/components/PostsTable";
import { brandFont } from "@/lib/theme";
import { Button } from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function PostsPage() {
  const session = await getServerSession(options);
  const authUser = session?.user;
  return (
    <div>
      <div className="flex">
        <h1 className={brandFont.className + " text-3xl mb-5 flex-1"}>
          Manage Posts
        </h1>
        <div>
          <Link href="/posts/add">
            <Button variant="contained" disableElevation>
              Add New Post +
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <PostsTable user={authUser} />
      </div>
    </div>
  );
}
