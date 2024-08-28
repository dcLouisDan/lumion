import { Chip, Divider, Typography } from "@mui/material";
import parse from "html-react-parser";
import { PostExtend } from "@/lib/types/modelTypesExtended";

import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export default function PostPreview({ post }: { post: PostExtend | null }) {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h4">{post?.title}</Typography>
      <p className="text-gray-500">
        By <span className="text-gray-900 font-bold">{post?.author.name}</span>{" "}
        &#183;{" "}
        {dayjs(post?.createdAt).format("MMM D, YYYY").toString()}
      </p>
      <div className="flex gap-2">
        {
          post?.categories.map(category => {
            return (
            <Chip label={category.name} color="secondary" size="small" variant="outlined" />
            )
          })
        }
      </div>
      <Divider variant="fullWidth" orientation="horizontal" />
      <div>{parse(post?.content as string)}</div>
    </div>
  );
}
