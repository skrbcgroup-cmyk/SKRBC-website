/* eslint-disable @next/next/no-img-element -- media images are served as-is from R2 */
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { RichBlock, RichInline } from "@/lib/rich-text";

function renderInline(nodes: RichInline[]): ReactNode {
  return nodes.map((node, index) => {
    if (node.type === "hardBreak") return <br key={index} />;

    let element: ReactNode = node.text;
    for (const mark of node.marks ?? []) {
      switch (mark.type) {
        case "bold":
          element = <strong>{element}</strong>;
          break;
        case "italic":
          element = <em>{element}</em>;
          break;
        case "underline":
          element = <u>{element}</u>;
          break;
        case "strike":
          element = <s>{element}</s>;
          break;
        case "link": {
          const external = /^https?:\/\//i.test(mark.href);
          element = (
            <a href={mark.href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
              {element}
            </a>
          );
          break;
        }
      }
    }
    return <span key={index}>{element}</span>;
  });
}

function renderBlocks(nodes: RichBlock[]): ReactNode {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "paragraph":
        return <p key={index}>{renderInline(node.content)}</p>;
      case "heading":
        return node.level === 2 ? (
          <h2 key={index}>{renderInline(node.content)}</h2>
        ) : (
          <h3 key={index}>{renderInline(node.content)}</h3>
        );
      case "bulletList":
      case "orderedList": {
        const List = node.type === "bulletList" ? "ul" : "ol";
        return (
          <List key={index}>
            {node.items.map((item, itemIndex) => (
              <li key={itemIndex}>{renderBlocks(item)}</li>
            ))}
          </List>
        );
      }
      case "blockquote":
        return <blockquote key={index}>{renderBlocks(node.content)}</blockquote>;
      case "horizontalRule":
        return <hr key={index} />;
      case "image":
        return (
          <figure key={index}>
            <img
              src={node.src}
              alt={node.alt}
              width={node.width}
              height={node.height}
              loading="lazy"
              decoding="async"
            />
            {node.alt && <figcaption>{node.alt}</figcaption>}
          </figure>
        );
    }
  });
}

/** Renders a sanitised rich-text document with the site's article typography. */
export function RichText({ doc, className }: { doc: RichBlock[]; className?: string }) {
  return <div className={cn("prose-skrbc", className)}>{renderBlocks(doc)}</div>;
}
