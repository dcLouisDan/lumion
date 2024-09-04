import { Category, Post, Tag, User } from "@prisma/client";

export type PostExtend = Post & {
  categories: Category[];
  tags: Tag[];
  author: User;
};

export type CommentExtend = {
  user: User;
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};
