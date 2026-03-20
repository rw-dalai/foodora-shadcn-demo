import { useState } from "react"
import { TopNavBar } from "@/features/top-nav/TopNavBar"
import { SideNavBar } from "@/features/side-nav/SideNavBar"
import { ShoppingCart } from "@/features/cart/ShoppingCart"
import { BottomNavBar } from "@/features/bottom-nav/BottomNavBar"
import s from "./app-shell.module.css"

const demoCartItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 12.99,
    quantity: 2,
    image: "https://placehold.co/100x100/e2e8f0/475569?text=Pizza",
  },
  {
    id: 2,
    name: "Caesar Salad",
    price: 8.99,
    quantity: 1,
    image: "https://placehold.co/100x100/e2e8f0/475569?text=Salad",
  },
]

export function AppShell({ children }) {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = demoCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <div className={s.appShell}>
      <TopNavBar
        onMenuClick={() => setSideNavOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={cartCount}
      />
      <SideNavBar open={sideNavOpen} onOpenChange={setSideNavOpen} />
      <ShoppingCart
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={demoCartItems}
      />
      <main className={s.main}>{children}</main>
      <BottomNavBar cartCount={cartCount} />
    </div>
  )
}
