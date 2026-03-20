import { Search, ShoppingCart, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import s from "./top-nav.module.css"

export function TopNavBar({ onMenuClick, onCartClick, cartCount = 0 }) {
  return (
    <header className={s.topNav}>
      <div className={s.container}>
        <Button
          variant="ghost"
          size="icon"
          className={s.menuButton}
          onClick={onMenuClick}
        >
          <Menu className="size-icon-md" />
        </Button>

        <div className={s.logo}>
          <span className="text-2xl font-bold text-primary">Spengerbite</span>
        </div>

        <div className={s.searchDesktop}>
          <Button variant="outline" className="w-full justify-start text-muted-foreground">
            <Search className="mr-2 size-icon-sm" />
            Search restaurants...
          </Button>
        </div>

        <div className={s.actions}>
          <Button variant="ghost" size="icon" className={s.searchMobile}>
            <Search className="size-icon-md" />
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" onClick={onCartClick}>
              <ShoppingCart className="size-icon-md" />
            </Button>
            {cartCount > 0 && (
              <Badge className={s.cartBadge} variant="destructive">
                {cartCount}
              </Badge>
            )}
          </div>

          <ModeToggle />

          <Avatar className="size-avatar-sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>
              <User className="size-icon-sm" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
