import { MapPin, CreditCard, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import s from "./checkout.module.css"

export function CheckoutForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onSubmit?.(Object.fromEntries(formData))
  }

  return (
    <form onSubmit={handleSubmit} className={s.checkoutForm}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-icon-md" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className={s.cardGrid}>
          <div className={s.field}>
            <Label htmlFor="checkout-name">Full Name</Label>
            <Input id="checkout-name" name="name" required />
          </div>
          <div className={s.field}>
            <Label htmlFor="checkout-phone">Phone Number</Label>
            <Input id="checkout-phone" name="phone" type="tel" required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-icon-md" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className={s.cardGrid}>
          <div className={s.fieldFull}>
            <Label htmlFor="checkout-street">Street Address</Label>
            <Input id="checkout-street" name="street" required />
          </div>
          <div className={s.field}>
            <Label htmlFor="checkout-city">City</Label>
            <Input id="checkout-city" name="city" required />
          </div>
          <div className={s.field}>
            <Label htmlFor="checkout-zip">ZIP Code</Label>
            <Input id="checkout-zip" name="zip" required />
          </div>
          <div className={s.fieldFull}>
            <Label htmlFor="checkout-notes">Delivery Notes (Optional)</Label>
            <Input
              id="checkout-notes"
              name="notes"
              placeholder="e.g., Ring the doorbell"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-icon-md" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className={s.cardGrid}>
          <div className={s.field}>
            <Label htmlFor="checkout-card">Card Number</Label>
            <Input
              id="checkout-card"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className={s.field}>
            <Label htmlFor="checkout-expiry">Expiry Date</Label>
            <Input
              id="checkout-expiry"
              name="expiry"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className={s.field}>
            <Label htmlFor="checkout-cvv">CVV</Label>
            <Input
              id="checkout-cvv"
              name="cvv"
              placeholder="123"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        Place Order
      </Button>
    </form>
  )
}
