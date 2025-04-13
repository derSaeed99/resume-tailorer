import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1 ml-1 text-[var(--color-secondary)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          className={cn(
            "w-full text-sm leading-5 font-normal resize-y",
            "px-3 py-[6px] border rounded-[6px]",
            "bg-[var(--color-bg)] text-[var(--color-secondary)] border-[var(--color-border)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] focus:border-[var(--color-border)]",
            "placeholder:text-muted-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            props.className
          )}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
