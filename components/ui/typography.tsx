import * as React from "react"
import { cn } from "@/lib/utils"

export function Typography({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert", className)} {...props} />
  )
}
