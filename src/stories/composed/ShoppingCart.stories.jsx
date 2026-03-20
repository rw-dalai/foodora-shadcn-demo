import { ShoppingCart } from "@/features/cart/ShoppingCart"
import componentSrc from "@/features/cart/ShoppingCart.jsx?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/ShoppingCart",
  component: ShoppingCart,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

const mockItems = [
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

export const Empty = {
  render: () => <ShoppingCart open={true} onOpenChange={() => {}} items={[]} />,
}

export const WithItems = {
  render: () => (
    <ShoppingCart open={true} onOpenChange={() => {}} items={mockItems} />
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        {
          filename: "features/cart/ShoppingCart.jsx",
          source: componentSrc,
        },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
