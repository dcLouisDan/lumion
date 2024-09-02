import { Chip, Divider, Typography } from "@mui/material";
import parse from "html-react-parser";
import { PostExtend } from "@/lib/types/modelTypesExtended";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Link from "next/link";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function PostPreview({
  post,
  preview = false,
}: {
  post: PostExtend | null;
  preview?: boolean;
}) {
  function limitString(str: string) {
    return str.substring(0, 300) + "...";
  }

  return (
    <div className="flex flex-col gap-4">
      <Typography className="text-xl sm:text-2xl">{post?.title}</Typography>
      <p className="text-gray-500 text-xs sm:text-sm">
        By <span className="text-gray-900 font-bold">{post?.author.name}</span>{" "}
        &#183; {dayjs(post?.createdAt).format("MMM D, YYYY").toString()}
      </p>
      <div className="flex gap-2">
        {post?.categories.map((category) => {
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
      <Divider variant="fullWidth" orientation="horizontal" />
      {preview ? (
        <>
          <div className="text-sm sm:text-base">{parse(limitString(post?.content as string) + "</p>")}</div>
          <Link
            href={"/blogs/" + post?.slug}
            className="text-gray-500 hover:text-gray-400 text-center hover:bg-gray-50 hover:underline transition-all ease-in-out duration-300 rounded-lg border px-2 py-1"
          >
            Read Full Blog
          </Link>
        </>
      ) : (
        <div>{parse(post?.content as string)}</div>
      )}
    </div>
  );
}
