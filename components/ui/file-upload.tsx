"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "./typography";

export interface FileUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, label, description, disabled, ...props }, ref) => {
    return (
      <div className="space-y-1 mb-4">
        <div className="flex justify-between items-center mb-2">
          {label && (
            <Typography className="text-sm font-medium text-[var(--color-secondary)] ml-1">
              {label}
            </Typography>
          )}
          {description && (
            <Typography className="text-xs text-[var(--color-secondary)] mr-1">
              {description}
            </Typography>
          )}
        </div>
        <label
          className={cn(
            "flex items-center justify-center w-full h-20 rounded-[6px] border text-sm px-4",
            "bg-[var(--color-surface)] text-[var(--color-text-muted)]",
            "border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-bg)]",
            "focus-within:ring-2 focus-within:ring-[var(--color-secondary)] focus-within:border-[var(--color-secondary)]",
            "transition-colors cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <input
            type="file"
            ref={ref}
            disabled={disabled}
            className="hidden"
            {...props}
          />
          {disabled ? "Upload disabled" : "Click to upload or drag & drop file"}
        </label>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
