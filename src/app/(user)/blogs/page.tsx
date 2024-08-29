import prisma from "@/lib/db";
import { Chip, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { groupObjectsByKey } from "@/lib/utils";
import { PostExtend } from "@/lib/types/modelTypesExtended";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export default async function BlogsPage() {
  const blogs = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true,
    },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  });

  const blogsByMonth = groupObjectsByKey(blogs, ({ createdAt }) =>
    dayjs(createdAt).format("MMMM (YYYY)").toString(),
  );
  //console.log(blogsByMonth)

  function MonthSection({
    month,
    blogs,
  }: {
    month: string;
    blogs: PostExtend[];
  }) {
    return (
      <div className="flex flex-col gap-4">
        <Typography className="text-xl font-bold sm:text-2xl">{month}</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map((blog) => {
            return (
              <Link
                href={`/blogs/${blog.slug}`}
                className=" hover:bg-gray-50 transition-all ease-in-out duration-300"
              >
                <Paper
                  elevation={0}
                  variant="outlined"
                  className="p-4 flex flex-col gap-2 overflow-auto h-full"
                  sx={{
                    bgcolor: "inherit",
                  }}
                >
                  <Typography
                    variant="h6"
                    className="text-xl sm:text-2xl flex-1"
                  >
                    {blog.title}
                  </Typography>

                  <p className="text-gray-500 text-sm">
                    By{" "}
                    <span className="text-gray-900 font-bold">
                      {blog?.author.name}
                    </span>{" "}
                    &#183;{" "}
                    {dayjs(blog?.createdAt).format("MMM D, YYYY").toString()}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {blog?.categories.map((category) => {
                      return (
                        <Chip
                          label={category.name}
                          color="secondary"
                          size="small"
                          variant="outlined"
                        />
                      );
                    })}
                  </div>
                </Paper>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Typography
        variant="h4"
        className="text-center text-2xl sm:4xl sm:text-left"
      >
        Browse blogs
      </Typography>
      {Object.keys(blogsByMonth).map((month) => {
        return <MonthSection month={month} blogs={blogsByMonth[month]} />;
      })}
    </div>
  );
}
