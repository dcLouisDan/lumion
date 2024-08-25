"use client";
import { Button, Snackbar, TextField } from "@mui/material";
import { Category, Prisma, Tag } from "@prisma/client";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import CheckboxesTags from "./CheckBoxesTags";
import { User } from "next-auth";
import Tiptap from "./Tiptap";
import { addNewPost } from "@/actions/post-actions";
import parse from "html-react-parser";

export default function AddPostForm({
  user,
  categories,
  tags,
}: {
  user: User | undefined;
  categories: Category[];
  tags: Tag[];
}) {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [content, setContent] = useState("");
  const [fields, setFields] = useState<Prisma.PostCreateInput>({
    title: "",
    slug: "",
    content: "",
    author: {
      connect: {
        id: user?.id ? Number(user?.id) : 1,
      },
    },
  });
  const [chosenCategories, setChosenCategories] = useState<Category[]>([]);
  const [chosenTags, setChosenTags] = useState<Tag[]>([]);

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });
  const [formErrors, setFormError] = useState<string | null>(null);

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prevState) => {
      const updatedFields = {
        ...prevState,
        [e.target?.name]: e.target.value,
      };

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

    const res = await addNewPost({
      ...fields,
      slug: fields.title.toLowerCase().replace(/\s+/g, "-"),
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
      <div>
        <h2 className="mb-2">Content</h2>
        <Tiptap setContent={setContent} />
      </div>
      <div className="flex justify-end">
        <Button variant="contained" disableElevation type="submit">
          Save Post
        </Button>
      </div>
      <div>
        <h2 className="mb-2">Preview:</h2>
        <div>{content}</div>
        <div className="border border-gray-300 rounded-sm p-4">
          {parse(content)}
        </div>
      </div>
    </form>
  );
}
