"use client";
import { Button, Snackbar, TextField } from "@mui/material";
import { Category, Post, Prisma, Tag } from "@prisma/client";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import CheckboxesTags from "./CheckBoxesTags";
import { User } from "next-auth";
import Tiptap from "./Tiptap";
import { addNewPost, updatePost } from "@/actions/post-actions";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import PostPreview from "./PostPreview";

export default function AddPostForm({
  user,
  categories,
  tags,
  method = "create",
  postData,
  chosenCategoriesData,
  chosenTagsData,
}: {
  user: User | undefined;
  categories: Category[];
  tags: Tag[];
  method?: "create" | "update";
  postData?: Post | null;
  chosenCategoriesData?: Category[];
  chosenTagsData?: Tag[];
}) {
  const router = useRouter();
  const initialFieldState: Prisma.PostCreateInput | Prisma.PostUpdateInput =
    method === "create"
      ? {
          title: "",
          slug: "",
          content: "",
          coverPicture: null,
          author: {
            connect: {
              id: user?.id ? Number(user?.id) : 1,
            },
          },
        }
      : {
          title: postData?.title,
          slug: postData?.slug,
          content: postData?.content,
          coverPicture: postData?.coverPicture,
          author: {
            connect: {
              id: user?.id ? Number(user?.id) : postData?.authorId,
            },
          },
        };
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [content, setContent] = useState(postData?.content ?? "");
  const [fields, setFields] = useState<
    Prisma.PostCreateInput | Prisma.PostUpdateInput
  >(initialFieldState);
  const [chosenCategories, setChosenCategories] = useState<Category[]>(
    chosenCategoriesData ?? []
  );
  const [chosenTags, setChosenTags] = useState<Tag[]>(chosenTagsData ?? []);

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prevState) => {
      const updatedFields = {
        ...prevState,
        [e.target?.name]: e.target.value,
      };
      if (e.target.name === "coverPicture") return updatedFields;

      validateField(e.target.name, e.target.value);
      return updatedFields;
    });
  }
  function validateField(name: string, value: string) {
    let error = "";

    if (!value.trim()) {
      error = `This field is required.`;
    }

    setErrors((prevState) => {
      return { ...prevState, [name]: error };
    });
  }

  function handleCategoriesChange(
    e: SyntheticEvent,
    newValue: { id: number; name: string }[]
  ) {
    setChosenCategories(newValue);
  }
  function handleTagsChange(
    e: SyntheticEvent,
    newValue: { id: number; name: string }[]
  ) {
    setChosenTags(newValue);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!fields.title) {
      setSnackMessage("Please add post title.");
      setSnackOpen(true);
      return;
    }
    if (method === "create") {
      const res = await addNewPost({
        title: fields.title as string,
        author: {
          connect: {
            id: user?.id ? Number(user?.id) : 1,
          },
        },
        coverPicture: !fields.coverPicture
          ? null
          : (fields.coverPicture as string),
        slug: fields.title.toString().toLowerCase().replace(/\s+/g, "-"),
        content: content,
        categories: {
          connect: chosenCategories,
        },
        tags: {
          connect: chosenTags,
        },
      });
      if (res.success) {
        setSnackMessage("New post added successfully.");
        setSnackOpen(true);
      } else {
        setSnackMessage(res?.error as string);
        setSnackOpen(true);
      }
    } else {
      const removedCategories = chosenCategoriesData?.filter(
        (dataCategory) =>
          !chosenCategories.some(
            (chosenCategory) => chosenCategory.id === dataCategory.id
          )
      );
      const removedTags = chosenTagsData?.filter(
        (dataTag) =>
          !chosenTags.some((chosenTag) => chosenTag.id === dataTag.id)
      );
      const res = await updatePost(
        {
          title: fields.title as string,
          author: {
            connect: {
              id: user?.id ? Number(user?.id) : 1,
            },
          },
          slug: fields.title.toString().toLowerCase().replace(/\s+/g, "-"),
          content: content,
          coverPicture: !fields.coverPicture
            ? null
            : (fields.coverPicture as string),
          categories: {
            connect: chosenCategories,
            disconnect: removedCategories,
          },
          tags: {
            connect: chosenTags,
            disconnect: removedTags,
          },
        },
        postData?.id
      );
      if (res.success) {
        setSnackMessage("Post updated successfully.");
        setSnackOpen(true);
        setTimeout(() => {
          router.push(`/posts/${postData?.id}`);
        }, 1000);
      } else {
        setSnackMessage(res?.error as string);
        setSnackOpen(true);
      }
    }
  }

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snackMessage}
      />
      <TextField
        id="author"
        variant="outlined"
        label="Author"
        size="small"
        name="author"
        fullWidth
        defaultValue={user?.name}
        disabled
      />
      <TextField
        variant="outlined"
        id="title"
        size="small"
        label="Title"
        name="title"
        value={fields.title}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
        onChange={handleFormInputChange}
      />
      {/* Categories options */}
      <CheckboxesTags
        value={chosenCategories}
        onChange={handleCategoriesChange}
        options={categories}
        placeholder="Choose categories"
        label="Categories"
        id="post-categories"
      />
      {/* Tags options */}
      <CheckboxesTags
        value={chosenTags}
        onChange={handleTagsChange}
        options={tags}
        placeholder="Choose tags"
        label="Tags"
        id="post-tags"
      />
      <TextField
        variant="outlined"
        id="coverPhoto"
        size="small"
        label="Cover Photo (optional)"
        name="coverPicture"
        value={fields.coverPicture}
        fullWidth
        onChange={handleFormInputChange}
      />
      <div>
        <h2 className="mb-2">Content</h2>
        <Tiptap defaulContent={content ?? ""} setContent={setContent} />
      </div>
      <div className="flex justify-end">
        <Button variant="contained" disableElevation type="submit">
          Save Post
        </Button>
      </div>
      <div>
        <h2 className="mb-2">Preview:</h2>
        {/* <div>{content}</div> */}
        <div className="border border-gray-300 rounded-sm p-4">
          {fields.coverPicture !== null && fields.coverPicture !== "" && (
            <img
              src={fields.coverPicture?.toString()}
              alt="preview cover image"
              className="max-h-96 w-full object-cover rounded-lg mb-5"
            />
          )}
          {parse(content)}
        </div>
      </div>
    </form>
  );
}
