import * as React from "react"
import TextAreaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextAreaAutosize
        className={cn(
          "flex w-full rounded-md px-3 py-2 placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-90",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
