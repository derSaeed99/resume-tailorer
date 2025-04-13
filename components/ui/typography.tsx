import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, JSX, forwardRef } from "react";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-2xl font-bold leading-snug", // Matches GitHub's h1
      h2: "text-xl font-semibold leading-snug", // GitHub's h2
      h3: "text-lg font-medium leading-snug", // GitHub's h3
      h4: "text-base font-medium leading-snug", // Optional h4
      p: "text-sm leading-relaxed text-foreground",
      blockquote:
        "mt-4 border-l-2 pl-4 italic text-base text-muted-foreground border-border",
      ul: "list-disc ml-6 text-sm leading-relaxed [&>li]:mt-1",
      code: "bg-muted text-sm font-mono px-[0.25rem] py-[0.15rem] rounded text-[var(--color-primary)]",
      lead: "text-base font-normal text-muted-foreground",
      large: "text-base font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      info: "text-info",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
  },
});

interface TypographyProps
  extends Omit<
      HTMLAttributes<
        HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement
      >,
      "color"
    >,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
