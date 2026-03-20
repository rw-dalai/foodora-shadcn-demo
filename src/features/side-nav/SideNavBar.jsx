import { Home, UtensilsCrossed, ShoppingBag, User, Settings, LogOut } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import s from "./side-nav.module.css"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: UtensilsCrossed, label: "Restaurants", href: "/restaurants" },
  { icon: ShoppingBag, label: "My Orders", href: "/orders" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function SideNavBar({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className={s.sideNav}>
        <SheetHeader>
          <SheetTitle className="text-primary">Spengerbite</SheetTitle>
        </SheetHeader>

        <nav className={s.nav}>
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" className={s.navItem}>
              <item.icon className="size-icon-md" />
              <span>{item.label}</span>
            </Button>
          ))}

          <Separator className="my-2" />

          <Button variant="ghost" className={s.navItem}>
            <Settings className="size-icon-md" />
            <span>Settings</span>
          </Button>

          <Button variant="ghost" className={s.navItem}>
            <LogOut className="size-icon-md" />
            <span>Logout</span>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
