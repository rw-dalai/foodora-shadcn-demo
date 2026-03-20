import { Sheet, SheetContent } from "@/components/ui/sheet"
import { CartPanel } from "./CartPanel"

export function ShoppingCart({ open, onOpenChange, items = [] }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-md">
        <CartPanel items={items} />
      </SheetContent>
    </Sheet>
  )
}
