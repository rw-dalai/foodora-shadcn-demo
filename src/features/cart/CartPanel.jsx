import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CartItem } from "./CartItem"
import s from "./cart.module.css"

export function CartPanel({ items = [], onUpdateQuantity, onRemove, onCheckout }) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const deliveryFee = items.length > 0 ? 3.99 : 0
  const total = subtotal + deliveryFee

  return (
    <div className={s.cartPanel}>
      <div className={s.cartHeader}>
        <div className="flex items-center gap-2">
          <ShoppingCart className="size-icon-md" />
          <h2 className="text-lg font-semibold">Your Cart</h2>
          {items.length > 0 && (
            <Badge variant="secondary">{items.length}</Badge>
          )}
        </div>
      </div>

      <Separator />

      {items.length === 0 ? (
        <div className={s.emptyCart}>
          <ShoppingCart className="size-icon-lg text-muted-foreground" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <p className="text-sm text-muted-foreground">
            Add items from a restaurant to get started
          </p>
        </div>
      ) : (
        <>
          <div className={s.cartItems}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>

          <div className={s.cartSummary}>
            <Separator />
            <div className={s.summaryRow}>
              <span>Subtotal</span>
              <span>&euro;{subtotal.toFixed(2)}</span>
            </div>
            <div className={s.summaryRow}>
              <span>Delivery Fee</span>
              <span>&euro;{deliveryFee.toFixed(2)}</span>
            </div>
            <Separator />
            <div className={s.summaryTotal}>
              <span>Total</span>
              <span>&euro;{total.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={onCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
