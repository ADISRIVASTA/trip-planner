import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "_fixed _inset-0 _z-50 _bg-black/80 _ data-[state=open]:_animate-in data-[state=closed]:_animate-out data-[state=closed]:_fade-out-0 data-[state=open]:_fade-in-0",
      className
    )}
    {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "_fixed _left-[50%] _top-[50%] _z-50 _grid _w-full _max-w-lg _translate-x-[-50%] _translate-y-[-50%] _gap-4 _border _bg-background _p-6 _shadow-lg _duration-200 data-[state=open]:_animate-in data-[state=closed]:_animate-out data-[state=closed]:_fade-out-0 data-[state=open]:_fade-in-0 data-[state=closed]:_zoom-out-95 data-[state=open]:_zoom-in-95 data-[state=closed]:_slide-out-to-left-1/2 data-[state=closed]:_slide-out-to-top-[48%] data-[state=open]:_slide-in-from-left-1/2 data-[state=open]:_slide-in-from-top-[48%] sm:_rounded-lg",
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className="_absolute _right-4 _top-4 _rounded-sm _opacity-70 _ring-offset-background _transition-opacity hover:_opacity-100 focus:_outline-none focus:_ring-2 focus:_ring-ring focus:_ring-offset-2 disabled:_pointer-events-none data-[state=open]:_bg-accent data-[state=open]:_text-muted-foreground">
        <X className="_h-4 _w-4" />
        <span className="_sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("_flex _flex-col _space-y-1.5 _text-center sm:_text-left", className)}
    {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "_flex _flex-col-reverse sm:_flex-row sm:_justify-end sm:_space-x-2",
      className
    )}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("_text-lg _font-semibold _leading-none _tracking-tight", className)}
    {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("_text-sm _text-muted-foreground", className)}
    {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
