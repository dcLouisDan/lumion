"use client";

import {
  ArrowDropDown,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatItalic,
  FormatUnderlined,
  InsertPageBreakRounded,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const Tiptap = ({
  setContent,
}: {
  setContent: (value: React.SetStateAction<string>) => void;
}) => {
  const [alignment, setAlignment] = React.useState("left");

  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl px-4 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getHTML();
      setContent(json);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Paper variant="outlined">
      <div className="bg-gray-100 border-b px-2 py-1 flex items-center gap-4 justify-end">
        <ToggleButtonGroup aria-label="text formatting" size="small">
          <ToggleButton
            value="bold"
            aria-label="bold"
            selected={editor.isActive("bold") ? true : false}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FormatBold />
          </ToggleButton>
          <ToggleButton
            value="italic"
            aria-label="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            selected={editor.isActive("italic") ? true : false}
          >
            <FormatItalic />
          </ToggleButton>
          <ToggleButton
            value="underlined"
            aria-label="underlined"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            selected={editor.isActive("underline") ? true : false}
          >
            <FormatUnderlined />
          </ToggleButton>
          {/* <ToggleButton value="color" aria-label="color" disabled>
            <FormatColorFill />
            <ArrowDropDown />
          </ToggleButton> */}
        </ToggleButtonGroup>
        <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
          <ToggleButton
            value="left"
            key="left"
            onClick={() => editor.chain().focus().setTextAlign("left")}
            selected={editor.isActive({ textAlign: "left" }) ? true : false}
          >
            <FormatAlignLeft />
          </ToggleButton>
          <ToggleButton
            value="center"
            key="center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            selected={editor.isActive({ textAlign: "center" }) ? true : false}
          >
            <FormatAlignCenter />
          </ToggleButton>
          <ToggleButton
            value="right"
            key="right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            selected={editor.isActive({ textAlign: "right" }) ? true : false}
          >
            <FormatAlignRight />
          </ToggleButton>
          <ToggleButton
            value="justify"
            key="justify"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            selected={editor.isActive({ textAlign: "justify" }) ? true : false}
          >
            <FormatAlignJustify />
          </ToggleButton>
        </ToggleButtonGroup>
        <IconButton size="small">
          <InsertPageBreakRounded
            fontSize="inherit"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          />
        </IconButton>
      </div>
      <EditorContent editor={editor} />
    </Paper>
  );
};

export default Tiptap;
