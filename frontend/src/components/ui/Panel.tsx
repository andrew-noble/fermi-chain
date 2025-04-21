import { cn } from "@/lib/utils"; // if you're using shadcn
import React from "react";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
}

export function Panel({ className, children, header, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-2 shadow-sm bg-white dark:bg-zinc-900",
        className
      )}
      {...props}
    >
      {header && <div className="mb-2 text-lg font-bold">{header}</div>}
      {children}
    </div>
  );
}
