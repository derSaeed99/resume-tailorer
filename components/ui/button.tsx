import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[6px] text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--color-border)]",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:brightness-105 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--color-border)]",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--color-surface)]",
        ghost:
          "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]",
        link: "text-[var(--color-primary)] underline underline-offset-4 hover:brightness-90",
      },
      size: {
        default: "h-8 px-4 py-[5px]",
        sm: "h-7 px-3 text-xs",
        lg: "h-9 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
