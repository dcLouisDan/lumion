"use client";
import { PostExtend } from "@/lib/types/modelTypesExtended";
import { groupObjectsByKey } from "@/lib/utils";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  SortDirection,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
dayjs.extend(utc);
dayjs.extend(timezone);

export const BlogsPageFeed = () => {
  const [blogs, setBlogs] = useState<Array<PostExtend>>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [order, setOrder] = useState<SortDirection>("desc");
  async function fetchPosts() {
    console.log(page);
    await axios
      .get(
        `/api/blogs?page=${page + 1}&pageSize=${rowsPerPage}&dateOrder=${order}`
      )
      .then((res) => {
        if (page === 0) {
          setBlogs(res.data.posts);
        } else {
          setBlogs((prev) => [...prev, ...res.data.posts]);
          console.log(blogs);
        }
        setTotalBlogs(res.data.totalPosts);
        setLoading(false);
        if (res.data.totalPosts <= blogs.length + res.data.posts.length) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const blogsByMonth = groupObjectsByKey(blogs, ({ createdAt }) =>
    dayjs(createdAt).format("MMMM (YYYY)").toString()
  );
  // console.log(blogsByMonth);

  function MonthSection({
    month,
    blogs,
  }: {
    month: string;
    blogs: PostExtend[];
  }) {
    return (
      <div className="flex flex-col gap-8">
        <Typography className="text-xl font-bold sm:text-2xl text-center">
          {month}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map((blog) => {
            return (
              <Link
                href={`/blogs/${blog.slug}`}
                className=" hover:bg-gray-50 transition-all ease-in-out duration-300"
                key={`${month}-${blog.id}`}
              >
                <Paper
                  elevation={0}
                  variant="outlined"
                  className="p-4 flex flex-col gap-4 overflow-auto h-full"
                  sx={{
                    bgcolor: "inherit",
                  }}
                >
                  <Typography className="text-xl flex-1 text-center">
                    "{blog.title}"
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
                          key={category.name}
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

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div className="text-center">Loading Data...</div>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex justify-center">
        <h1 className="text-center text-gray-500 py-10 max-w-80">
          Sorry... No blogs have been published yet. Please come back another
          time...
        </h1>
      </div>
    );
  }

  return (
    <>
      {Object.keys(blogsByMonth).map((month) => {
        return (
          <MonthSection key={month} month={month} blogs={blogsByMonth[month]} />
        );
      })}
      {hasMore && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Load More
        </Button>
      )}
    </>
  );
};
