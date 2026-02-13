import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "./lib/utils";
// import { Tree, Folder, File, CollapseButton } from "@/components/ui/file-tree";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-foreground font-medium mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-foreground font-medium mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-foreground/80 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-foreground/80 list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-foreground/80 list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-primary underline underline-offset-2";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  // code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
  //   const codeHTML = highlight(children as string);
  //   return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  // },
  Table: ({
    data,
    className,
  }: {
    data: { headers: string[]; rows: string[][] };
    className?: string;
  }) => (
    <table
      className={cn(
        "w-full border-collapse text-left text-sm mt-4 mb-6",
        className
      )}
    >
      <thead>
        <tr className="border-b border-muted">
          {data.headers.map((header, index) => (
            <th
              key={index}
              className="px-3 py-2 font-medium text-muted-foreground"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index} className="border-b border-muted">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-3 py-2 text-foreground/80">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  // Tree,
  // Folder,
  // File,
  // CollapseButton,
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 pl-4 border text-muted-foreground"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
