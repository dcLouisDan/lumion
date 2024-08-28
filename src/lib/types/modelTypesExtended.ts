import { Category, Post, Tag, User } from "@prisma/client";

export type PostExtend = Post & {
  categories: Category[];
  tags: Tag[];
  author: User;
};
