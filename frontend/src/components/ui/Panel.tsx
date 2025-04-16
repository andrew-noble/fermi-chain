import { cn } from "@/lib/utils"; // if you're using shadcn
import React from "react";

export function Panel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 shadow-sm bg-white dark:bg-zinc-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
