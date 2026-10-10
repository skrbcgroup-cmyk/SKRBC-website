/**
 * Rich text for articles and case studies.
 *
 * The editor saves a JSON document. Before it is stored, and again before it is shown,
 * it passes through sanitizeDoc(), which keeps only the node types, marks and attributes
 * listed here. The public site renders that clean structure as React elements
 * (src/components/rich-text/rich-text.tsx), so no raw HTML ever reaches the page.
 */

export type RichMark =
  { type: "bold" | "italic" | "underline" | "strike" } | { type: "link"; href: string };

export type RichInline = { type: "text"; text: string; marks?: RichMark[] } | { type: "hardBreak" };

export type RichBlock =
  | { type: "paragraph"; content: RichInline[] }
  | { type: "heading"; level: 2 | 3; content: RichInline[] }
  | { type: "bulletList" | "orderedList"; items: RichBlock[][] }
  | { type: "blockquote"; content: RichBlock[] }
  | { type: "horizontalRule" }
  | { type: "image"; src: string; alt: string; width?: number; height?: number };

export type RichDoc = RichBlock[];

type RawNode = {
  type?: unknown;
  text?: unknown;
  attrs?: Record<string, unknown>;
  marks?: { type?: unknown; attrs?: Record<string, unknown> }[];
  content?: unknown;
};

const MAX_DEPTH = 8;

/** Links may point to web pages, email, phone or pages on this site. */
export function isSafeHref(href: unknown): href is string {
  if (typeof href !== "string" || href.length > 2000) return false;
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  return /^(https?:\/\/|mailto:|tel:)/i.test(href);
}

/** Images must come from this site's own media storage. */
export function isSafeImageSrc(src: unknown): src is string {
  return typeof src === "string" && /^\/media\/[\w/.-]+$/.test(src) && !src.includes("..");
}

function children(node: RawNode): RawNode[] {
  return Array.isArray(node.content) ? (node.content as RawNode[]) : [];
}

function cleanMarks(marks: RawNode["marks"]): RichMark[] | undefined {
  if (!Array.isArray(marks)) return undefined;
  const clean: RichMark[] = [];
  for (const mark of marks) {
    if (
      mark.type === "bold" ||
      mark.type === "italic" ||
      mark.type === "underline" ||
      mark.type === "strike"
    ) {
      clean.push({ type: mark.type });
    } else if (mark.type === "link" && isSafeHref(mark.attrs?.href)) {
      clean.push({ type: "link", href: mark.attrs.href });
    }
  }
  return clean.length > 0 ? clean : undefined;
}

function cleanInline(nodes: RawNode[]): RichInline[] {
  const clean: RichInline[] = [];
  for (const node of nodes) {
    if (node.type === "text" && typeof node.text === "string" && node.text.length > 0) {
      const marks = cleanMarks(node.marks);
      clean.push(
        marks ? { type: "text", text: node.text, marks } : { type: "text", text: node.text },
      );
    } else if (node.type === "hardBreak") {
      clean.push({ type: "hardBreak" });
    }
  }
  return clean;
}

function cleanBlocks(nodes: RawNode[], depth: number): RichBlock[] {
  if (depth > MAX_DEPTH) return [];
  const clean: RichBlock[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "paragraph":
        clean.push({ type: "paragraph", content: cleanInline(children(node)) });
        break;
      case "heading": {
        const level = node.attrs?.level === 3 ? 3 : 2;
        clean.push({ type: "heading", level, content: cleanInline(children(node)) });
        break;
      }
      case "bulletList":
      case "orderedList": {
        const items = children(node)
          .filter((item) => item.type === "listItem")
          .map((item) => cleanBlocks(children(item), depth + 1));
        if (items.length > 0) clean.push({ type: node.type, items });
        break;
      }
      case "blockquote":
        clean.push({ type: "blockquote", content: cleanBlocks(children(node), depth + 1) });
        break;
      case "horizontalRule":
        clean.push({ type: "horizontalRule" });
        break;
      case "image": {
        const { src, alt, width, height } = node.attrs ?? {};
        if (!isSafeImageSrc(src)) break;
        clean.push({
          type: "image",
          src,
          alt: typeof alt === "string" ? alt.slice(0, 300) : "",
          ...(typeof width === "number" && typeof height === "number" ? { width, height } : {}),
        });
        break;
      }
      // Anything else (code blocks, unknown nodes) is dropped.
    }
  }
  return clean;
}

/** Turns untrusted editor JSON into a safe, minimal document. */
export function sanitizeDoc(input: unknown): RichDoc {
  if (typeof input === "string") {
    try {
      input = JSON.parse(input);
    } catch {
      return [];
    }
  }
  const root = input as RawNode | null;
  if (!root || root.type !== "doc") return [];
  return cleanBlocks(children(root), 0);
}

/** Converts a sanitised document back into the editor's JSON format. */
export function toEditorJson(doc: RichDoc) {
  const inline = (nodes: RichInline[]) =>
    nodes.map((node) =>
      node.type === "hardBreak"
        ? { type: "hardBreak" }
        : {
            type: "text",
            text: node.text,
            ...(node.marks && {
              marks: node.marks.map((mark) =>
                mark.type === "link" ? { type: "link", attrs: { href: mark.href } } : mark,
              ),
            }),
          },
    );

  const blocks = (nodes: RichBlock[]): object[] =>
    nodes.map((node) => {
      switch (node.type) {
        case "paragraph":
          return { type: "paragraph", content: inline(node.content) };
        case "heading":
          return { type: "heading", attrs: { level: node.level }, content: inline(node.content) };
        case "bulletList":
        case "orderedList":
          return {
            type: node.type,
            content: node.items.map((item) => ({ type: "listItem", content: blocks(item) })),
          };
        case "blockquote":
          return { type: "blockquote", content: blocks(node.content) };
        case "horizontalRule":
          return { type: "horizontalRule" };
        case "image":
          return {
            type: "image",
            attrs: { src: node.src, alt: node.alt, width: node.width, height: node.height },
          };
      }
    });

  return { type: "doc", content: blocks(doc) };
}

/** Plain text of a document, for word counts and fallbacks. */
export function plainText(doc: RichDoc): string {
  const parts: string[] = [];
  const walk = (nodes: RichBlock[]) => {
    for (const node of nodes) {
      if (node.type === "paragraph" || node.type === "heading") {
        parts.push(node.content.map((n) => (n.type === "text" ? n.text : " ")).join(""));
      } else if (node.type === "bulletList" || node.type === "orderedList") {
        node.items.forEach(walk);
      } else if (node.type === "blockquote") {
        walk(node.content);
      }
    }
  };
  walk(doc);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}
