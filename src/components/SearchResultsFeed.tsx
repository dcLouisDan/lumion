"use client";
import { PostExtend } from "@/lib/types/modelTypesExtended";
import { groupObjectsByKey } from "@/lib/utils";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  dividerClasses,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SortDirection,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";
import PostPreview from "./PostPreview";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function SearchResultsFeed({ search }: { search: string }) {
  const minimumShowResults = 10;
  const [blogs, setBlogs] = useState<Array<PostExtend>>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  async function fetchPosts() {
    await axios
      .get(
        `/api/searchResults?page=${page}&pageSize=${rowsPerPage}&search=${search}`
      )
      .then((res) => {
        setBlogs(res.data.posts);
        setTotalBlogs(res.data.totalPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, [page, rowsPerPage]);

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
          No post found. Try searching using another term.
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center">
        {totalBlogs <= minimumShowResults ? (
          <div className="flex-1">
            Showing {totalBlogs} of {totalBlogs} results
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            Showing
            <div className="w-20 inline-block">
              <FormControl size="small" fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rowsPerPage}
                  onChange={(event) => {
                    setRowsPerPage(event.target.value as number);
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </div>
            of {totalBlogs} results.
          </div>
        )}
        <Pagination
          page={page}
          count={Math.ceil(totalBlogs / rowsPerPage)}
          onChange={(event, value) => setPage(value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogs.map((blog) => {
          return (
            <Paper key={blog.id} variant="outlined" className="p-4">
              <PostPreview preview={true} post={blog} />
            </Paper>
          );
        })}
      </div>
    </>
  );
}
