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
  FormatStrikethrough,
  FormatUnderlined,
  HorizontalRule,
  InsertPageBreakRounded,
  InsertPhoto,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import React, { FormEvent, useState } from "react";

const Tiptap = ({
  defaulContent,
  setContent,
}: {
  defaulContent?: string;
  setContent: (value: React.SetStateAction<string>) => void;
}) => {
  const [alignment, setAlignment] = React.useState("left");
  const [openImageUrlInput, setOpenImageUrlInput] = useState(false);
  const [imageURL, setImageUrl] = useState("");

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
        heading: false,
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "py-2 w-full px-4 sm:px-10 rounded-lg overflow-hidden",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [index: number]: string } = {
            1: "text-2xl",
            2: "text-xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]} font-semibold`,
            }),
            0,
          ];
        },
      }).configure({ levels: [1, 2] }),
    ],
    immediatelyRender: false,
    content: defaulContent,
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
  function addImage() {
    setOpenImageUrlInput(true);
  }
  function closeImageModal() {
    setOpenImageUrlInput(false);
  }
  function imageUrlSubmit() {
    if (imageURL.trim() !== "" && editor !== null) {
      editor.chain().focus().setImage({ src: imageURL }).run();
    }

    closeImageModal();
  }

  return (
    <Paper variant="outlined">
      <Modal
        open={openImageUrlInput}
        onClose={closeImageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ bgcolor: "background.paper" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg"
        >
          <Typography id="modal-modal-title" className="mb-3">
            Insert Image URL:
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="https://website.com/image.jpeg"
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button
              variant="contained"
              type="button"
              onClick={imageUrlSubmit}
              disableElevation
            >
              Insert Photo
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="bg-gray-100 border-b px-2 py-1 grid grid-cols-2 sm:flex sm:gap-2 gap-2 justify-items-center">
        <ToggleButtonGroup aria-label="text style" size="small">
          <Tooltip title="H1">
            <ToggleButton
              value="h1"
              aria-label="h1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              selected={editor.isActive("heading", { level: 1 }) ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="13px"
                viewBox="0 -960 960 960"
                width="13px"
                fill="inherit"
              >
                <path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z" />
              </svg>
            </ToggleButton>
          </Tooltip>
          <Tooltip title="H2">
            <ToggleButton
              value="h2"
              aria-label="h2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              selected={editor.isActive("heading", { level: 2 }) ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="13px"
                viewBox="0 -960 960 960"
                width="13px"
                fill="inherit"
              >
                <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z" />
              </svg>
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
        <ToggleButtonGroup aria-label="text formatting" size="small">
          <Tooltip title="Bold">
            <ToggleButton
              value="bold"
              aria-label="bold"
              selected={editor.isActive("bold") ? true : false}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FormatBold fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Italic">
            <ToggleButton
              value="italic"
              aria-label="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              selected={editor.isActive("italic") ? true : false}
            >
              <FormatItalic fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Underline">
            <ToggleButton
              value="underlined"
              aria-label="underlined"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              selected={editor.isActive("underline") ? true : false}
            >
              <FormatUnderlined fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Strike">
            <ToggleButton
              value="strike"
              aria-label="strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              selected={editor.isActive("strike") ? true : false}
            >
              <FormatStrikethrough fontSize="inherit" />
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
              <FormatAlignLeft fontSize="inherit" />
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
              <FormatAlignCenter fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Align Right">
            <ToggleButton
              value="right"
              key="right"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              selected={editor.isActive({ textAlign: "right" }) ? true : false}
            >
              <FormatAlignRight fontSize="inherit" />
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
              <FormatAlignJustify fontSize="inherit" />
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
              <FormatQuote fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Ordered List">
            <ToggleButton
              value="ordered-list"
              aria-label="ordered list"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              selected={editor.isActive("orderedList") ? true : false}
            >
              <FormatListNumbered fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Bullet List">
            <ToggleButton
              value="bullet-list"
              aria-label="bullet list"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              selected={editor.isActive("orderedList") ? true : false}
            >
              <FormatListBulleted fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <ToggleButtonGroup aria-label="text style" size="small">
          <Tooltip title="Insert Paragraph Break">
            <ToggleButton
              value="hard-break"
              aria-label="hard-break"
              onClick={() => editor.chain().focus().setHardBreak().run()}
            >
              <InsertPageBreakRounded fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Insert Horizontal Rule">
            <ToggleButton
              value="horizontal-rule"
              aria-label="horizontal-rule"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <HorizontalRule fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
        <ToggleButtonGroup aria-label="text style" size="small">
          <Tooltip title="Insert Image">
            <ToggleButton value="image" aria-label="image" onClick={addImage}>
              <InsertPhoto fontSize="inherit" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </div>
      <EditorContent editor={editor} />
    </Paper>
  );
};

export default Tiptap;
