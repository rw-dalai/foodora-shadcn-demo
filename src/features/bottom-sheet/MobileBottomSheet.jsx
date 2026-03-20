import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import s from "./bottom-sheet.module.css"

export function MobileBottomSheet({ open, onOpenChange, title, children }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className={s.bottomSheet}>
        {title && (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
        )}
        <div className={s.content}>{children}</div>
      </SheetContent>
    </Sheet>
  )
}
