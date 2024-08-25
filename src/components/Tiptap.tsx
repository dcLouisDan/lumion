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
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  InsertPageBreakRounded,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
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
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class:
              "text-gray-500 border-s-2 py-3 border-gray-400 ps-5 ms-5 italic",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ms-8",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ms-8",
          },
        },
      }),
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
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl px-4 py-2 focus:outline-none min-h-96",
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
          <Tooltip title="Bold">
            <ToggleButton
              value="bold"
              aria-label="bold"
              selected={editor.isActive("bold") ? true : false}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FormatBold />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Italic">
            <ToggleButton
              value="italic"
              aria-label="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              selected={editor.isActive("italic") ? true : false}
            >
              <FormatItalic />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Underline">
            <ToggleButton
              value="underlined"
              aria-label="underlined"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              selected={editor.isActive("underline") ? true : false}
            >
              <FormatUnderlined />
            </ToggleButton>
          </Tooltip>
          {/* <ToggleButton value="color" aria-label="color" disabled>
            <FormatColorFill />
            <ArrowDropDown />
          </ToggleButton> */}
        </ToggleButtonGroup>
        <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
          <Tooltip title="Align Left">
            <ToggleButton
              value="left"
              key="left"
              onClick={() => editor.chain().focus().setTextAlign("left")}
              selected={editor.isActive({ textAlign: "left" }) ? true : false}
            >
              <FormatAlignLeft />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Align Center">
            <ToggleButton
              value="center"
              key="center"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              selected={editor.isActive({ textAlign: "center" }) ? true : false}
            >
              <FormatAlignCenter />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Align Right">
            <ToggleButton
              value="right"
              key="right"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              selected={editor.isActive({ textAlign: "right" }) ? true : false}
            >
              <FormatAlignRight />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Justify">
            <ToggleButton
              value="justify"
              key="justify"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              selected={
                editor.isActive({ textAlign: "justify" }) ? true : false
              }
            >
              <FormatAlignJustify />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <ToggleButtonGroup aria-label="text formatting" size="small">
          <Tooltip title="Blockquote">
            <ToggleButton
              value="quote"
              aria-label="quote"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              selected={editor.isActive("blockquote") ? true : false}
            >
              <FormatQuote />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Ordered List">
            <ToggleButton
              value="ordered-list"
              aria-label="ordered list"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              selected={editor.isActive("orderedList") ? true : false}
            >
              <FormatListNumbered />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Bullet List">
            <ToggleButton
              value="bullet-list"
              aria-label="bullet list"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              selected={editor.isActive("orderedList") ? true : false}
            >
              <FormatListBulleted />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
        <Tooltip title="Insert Paragraph Break">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <InsertPageBreakRounded fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </div>
      <EditorContent editor={editor} />
    </Paper>
  );
};

export default Tiptap;
