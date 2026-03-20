import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import s from "./cart.module.css"

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className={s.cartItem}>
      <div className={s.itemInfo}>
        <img src={item.image} alt={item.name} className={s.itemImage} />
        <div className={s.itemDetails}>
          <h4 className={s.itemName}>{item.name}</h4>
          <p className={s.itemPrice}>&euro;{item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className={s.itemActions}>
        <div className={s.quantityControl}>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="size-icon-xs" />
          </Button>
          <span className={s.quantity}>{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
          >
            <Plus className="size-icon-xs" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive"
          onClick={() => onRemove?.(item.id)}
        >
          <Trash2 className="size-icon-xs" />
        </Button>
      </div>
    </div>
  )
}
