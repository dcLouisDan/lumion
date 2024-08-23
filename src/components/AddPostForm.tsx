"use client";
import { Button, TextField } from "@mui/material";
import { Category, Prisma, Tag } from "@prisma/client";
import { error } from "console";
import React, { SyntheticEvent, useState } from "react";
import CheckboxesTags from "./CheckBoxesTags";
import { User } from "next-auth";

export default function AddPostForm({
  user,
  categories,
  tags,
}: {
  user: User | undefined;
  categories: Category[];
  tags: Tag[];
}) {
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
  return (
    <form className="flex flex-col gap-4">
      <TextField
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
        size="small"
        label="Title"
        name="title"
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
      />
      {/* Categories options */}
      <CheckboxesTags
        value={chosenCategories}
        onChange={handleCategoriesChange}
        options={categories}
        placeholder="Choose categories"
        label="Categories"
      />
      {/* Tags options */}
      <CheckboxesTags
        value={chosenCategories}
        onChange={handleTagsChange}
        options={tags}
        placeholder="Choose tags"
        label="Tags"
      />
      <TextField
        variant="outlined"
        size="small"
        name="content"
        error={!!errors.content}
        helperText={errors.content}
        label="Content"
        fullWidth
        multiline
        minRows={10}
      />

      <div className="flex justify-end">
        <Button variant="contained" disableElevation type="submit">
          Save Post
        </Button>
      </div>
    </form>
  );
}
