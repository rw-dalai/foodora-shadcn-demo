import { Home, UtensilsCrossed, ShoppingBag, ShoppingCart, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import s from "./bottom-nav.module.css"

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: UtensilsCrossed, label: "Restaurants", id: "restaurants" },
  { icon: ShoppingBag, label: "Orders", id: "orders" },
  { icon: ShoppingCart, label: "Cart", id: "cart" },
  { icon: User, label: "Profile", id: "profile" },
]

export function BottomNavBar({ activeItem = "home", cartCount = 0, onItemClick }) {
  return (
    <nav className={s.bottomNav}>
      <ul className={s.navList}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`${s.navItem} ${activeItem === item.id ? s.navItemActive : ""}`}
              onClick={() => onItemClick?.(item.id)}
            >
              <span className="relative">
                <item.icon className="size-icon-md" />
                {item.id === "cart" && cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2.5 -top-1.5 h-4 min-w-4 px-1 text-[10px]"
                  >
                    {cartCount}
                  </Badge>
                )}
              </span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
