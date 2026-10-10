"use client";

import Image from "@tiptap/extension-image";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  LoaderCircle,
  Minus,
  Quote,
  Redo2,
  Underline,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { compressImage } from "@/lib/compress-image";
import { cn } from "@/lib/cn";
import type { UploadResult } from "@/lib/media";
import { isSafeHref } from "@/lib/rich-text";

/** Image node that also remembers its pixel size, to avoid layout shift on the public page. */
const SizedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null },
      height: { default: null },
    };
  },
});

type ToolbarButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

function ToolbarButton({ icon: Icon, label, onClick, active, disabled }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "grid size-10 cursor-pointer place-items-center rounded-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        active ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-ivory",
      )}
    >
      <Icon aria-hidden="true" strokeWidth={1.75} className="size-[1.125rem]" />
    </button>
  );
}

function Toolbar({
  editor,
  onImage,
  uploading,
}: {
  editor: Editor;
  onImage: () => void;
  uploading: boolean;
}) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      linkHref: (e.getAttributes("link").href as string | undefined) ?? "",
      image: e.isActive("image"),
      imageAlt: (e.getAttributes("image").alt as string | undefined) ?? "",
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const [linkOpen, setLinkOpen] = useState(false);
  const [href, setHref] = useState("");
  const [linkError, setLinkError] = useState<string | null>(null);
  const chain = () => editor.chain().focus();

  const openLink = () => {
    setHref(state.linkHref);
    setLinkError(null);
    setLinkOpen((open) => !open);
  };

  const applyLink = () => {
    const value = href.trim();
    if (!value) {
      chain().extendMarkRange("link").unsetLink().run();
      setLinkOpen(false);
      return;
    }
    const normalised = /^(https?:|mailto:|tel:|\/)/i.test(value) ? value : `https://${value}`;
    if (!isSafeHref(normalised)) {
      setLinkError("Please enter a full web address, for example https://example.com");
      return;
    }
    chain().extendMarkRange("link").setLink({ href: normalised }).run();
    setLinkOpen(false);
  };

  return (
    <div className="sticky top-0 z-10 border-b border-line bg-white">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex flex-wrap items-center gap-0.5 p-1.5"
      >
        <ToolbarButton
          icon={Heading2}
          label="Heading"
          active={state.h2}
          onClick={() => chain().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          icon={Heading3}
          label="Subheading"
          active={state.h3}
          onClick={() => chain().toggleHeading({ level: 3 }).run()}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-line" />
        <ToolbarButton
          icon={Bold}
          label="Bold"
          active={state.bold}
          onClick={() => chain().toggleBold().run()}
        />
        <ToolbarButton
          icon={Italic}
          label="Italic"
          active={state.italic}
          onClick={() => chain().toggleItalic().run()}
        />
        <ToolbarButton
          icon={Underline}
          label="Underline"
          active={state.underline}
          onClick={() => chain().toggleUnderline().run()}
        />
        <ToolbarButton
          icon={Link2}
          label="Link"
          active={state.link || linkOpen}
          onClick={openLink}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-line" />
        <ToolbarButton
          icon={List}
          label="Bulleted list"
          active={state.bullet}
          onClick={() => chain().toggleBulletList().run()}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered list"
          active={state.ordered}
          onClick={() => chain().toggleOrderedList().run()}
        />
        <ToolbarButton
          icon={Quote}
          label="Quote"
          active={state.quote}
          onClick={() => chain().toggleBlockquote().run()}
        />
        <ToolbarButton
          icon={Minus}
          label="Divider"
          onClick={() => chain().setHorizontalRule().run()}
        />
        <ToolbarButton
          icon={uploading ? LoaderCircle : ImagePlus}
          label={uploading ? "Uploading image" : "Insert image"}
          disabled={uploading}
          onClick={onImage}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-line" />
        <ToolbarButton
          icon={Undo2}
          label="Undo"
          disabled={!state.canUndo}
          onClick={() => chain().undo().run()}
        />
        <ToolbarButton
          icon={Redo2}
          label="Redo"
          disabled={!state.canRedo}
          onClick={() => chain().redo().run()}
        />
      </div>

      {state.image && (
        <div className="flex flex-wrap items-center gap-2 border-t border-line p-3">
          <label htmlFor="editor-image-alt" className="text-sm font-medium text-navy-900">
            Image description
          </label>
          <input
            id="editor-image-alt"
            type="text"
            value={state.imageAlt}
            maxLength={300}
            placeholder="Describe the image for screen readers and search engines"
            onChange={(event) =>
              editor.chain().updateAttributes("image", { alt: event.target.value }).run()
            }
            className="h-10 min-w-60 flex-1 border border-line px-3 text-[0.9375rem] focus:border-navy-900"
          />
        </div>
      )}

      {linkOpen && (
        <div className="flex flex-wrap items-start gap-2 border-t border-line p-3">
          <div className="min-w-60 flex-1">
            <label htmlFor="editor-link" className="sr-only">
              Link address
            </label>
            <input
              id="editor-link"
              type="url"
              value={href}
              autoFocus
              placeholder="https://example.com"
              onChange={(event) => setHref(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyLink();
                }
                if (event.key === "Escape") setLinkOpen(false);
              }}
              className="h-10 w-full border border-line px-3 text-[0.9375rem] focus:border-navy-900"
            />
            {linkError && <p className="mt-1 text-sm text-danger">{linkError}</p>}
          </div>
          <button
            type="button"
            onClick={applyLink}
            className="h-10 cursor-pointer rounded-xs bg-navy-900 px-4 text-sm font-medium text-white"
          >
            Apply
          </button>
          {state.link && (
            <button
              type="button"
              onClick={() => {
                chain().extendMarkRange("link").unsetLink().run();
                setLinkOpen(false);
              }}
              className="h-10 cursor-pointer px-3 text-sm text-danger"
            >
              Remove link
            </button>
          )}
        </div>
      )}
    </div>
  );
}

type RichTextEditorProps = {
  id: string;
  /** Initial document (editor JSON). */
  initialContent: object;
  onChange: (json: string) => void;
  uploadImage: (formData: FormData) => Promise<UploadResult>;
  describedBy?: string;
  invalid?: boolean;
};

export function RichTextEditor({
  id,
  initialContent,
  onChange,
  uploadImage,
  describedBy,
  invalid,
}: RichTextEditorProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      SizedImage,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        id,
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Article text",
        ...(describedBy && { "aria-describedby": describedBy }),
        ...(invalid && { "aria-invalid": "true" }),
        class: "prose-skrbc min-h-80 px-5 py-4 outline-none",
      },
    },
    onUpdate: ({ editor: e }) => onChange(JSON.stringify(e.getJSON())),
  });

  const insertImage = async (file: File) => {
    if (!editor) return;
    setUploadError(null);
    setUploading(true);
    try {
      const prepared = await compressImage(file);
      const formData = new FormData();
      formData.set("file", prepared.file);
      const result = await uploadImage(formData);
      if (!result.ok) {
        setUploadError(result.error);
        return;
      }
      editor
        .chain()
        .focus()
        .insertContent({
          type: "image",
          attrs: { src: result.src, alt: "", width: prepared.width, height: prepared.height },
        })
        .run();
    } catch {
      setUploadError("The image could not be uploaded. Please try another file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={cn(
        "border bg-white transition-colors focus-within:border-navy-900",
        invalid ? "border-danger" : "border-line",
      )}
    >
      {editor ? (
        <Toolbar editor={editor} uploading={uploading} onImage={() => fileInput.current?.click()} />
      ) : (
        <div className="h-[3.25rem] border-b border-line" />
      )}
      <EditorContent editor={editor} />
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void insertImage(file);
        }}
      />
      {uploadError && (
        <p role="alert" className="border-t border-line px-5 py-3 text-sm text-danger">
          {uploadError}
        </p>
      )}
    </div>
  );
}
