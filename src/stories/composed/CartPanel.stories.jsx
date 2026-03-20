import { CartPanel } from "@/features/cart/CartPanel"
import cartPanelSrc from "@/features/cart/CartPanel.jsx?raw"
import cartItemSrc from "@/features/cart/CartItem.jsx?raw"
import cssSrc from "@/features/cart/cart.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/CartPanel",
  component: CartPanel,
  parameters: { layout: "centered" },
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
  {
    id: 3,
    name: "Tiramisu",
    price: 6.5,
    quantity: 1,
    image: "https://placehold.co/100x100/e2e8f0/475569?text=Dessert",
  },
]

export const Empty = {
  render: () => <CartPanel items={[]} />,
}

export const WithItems = {
  render: () => <CartPanel items={mockItems} />,
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/cart/CartPanel.jsx", source: cartPanelSrc },
        { filename: "features/cart/CartItem.jsx", source: cartItemSrc },
        { filename: "features/cart/cart.module.css", source: cssSrc },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
