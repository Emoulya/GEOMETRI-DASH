/**
 * Card Component (PRD 13.6)
 *
 * Bayangan tipis, batas terlihat (bukan hanya bayangan).
 * Digunakan untuk bangun, ciri, dan topik.
 */

import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "interactive" | "highlighted";
  padding?: "sm" | "md" | "lg";
  as?: "div" | "article" | "section";
}

const variantStyles: Record<string, string> = {
  default: "bg-white border border-ui-border shadow-sm",
  interactive: [
    "bg-white border border-ui-border shadow-sm cursor-pointer",
    "hover:shadow-md hover:border-ui-accent/40 hover:-translate-y-0.5",
    "active:translate-y-0 active:shadow-sm",
    "transition-all duration-150",
  ].join(" "),
  highlighted: "bg-ui-accent-light border-2 border-ui-accent shadow-sm",
};

const paddingStyles: Record<string, string> = {
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  children,
  variant = "default",
  padding = "md",
  as: Tag = "div",
  className = "",
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        "rounded-xl",
        variantStyles[variant],
        paddingStyles[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
