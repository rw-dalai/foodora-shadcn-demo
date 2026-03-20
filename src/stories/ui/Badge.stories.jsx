import { Badge } from "@/components/ui/badge"
import badgeSrc from "@/components/ui/badge.jsx?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export const Default = {
  args: { children: "Badge" },
  render: (args) => <Badge {...args} />,
}

export const Variants = () => (
  <div className="flex flex-wrap gap-2">
    <Badge>Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
)

export const OrderStatus = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="outline">Pending</Badge>
    <Badge variant="secondary">Preparing</Badge>
    <Badge>Out for Delivery</Badge>
    <Badge variant="destructive">Cancelled</Badge>
  </div>
)

export const CuisineTypes = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="secondary">Italian</Badge>
    <Badge variant="secondary">Asian</Badge>
    <Badge variant="secondary">Mexican</Badge>
    <Badge variant="secondary">Vegan</Badge>
    <Badge variant="secondary">Fast Food</Badge>
  </div>
)

export const Source = {
  render: () => (
    <SourceCode
      files={[{ filename: "components/ui/badge.jsx", source: badgeSrc }]}
    />
  ),
  parameters: { layout: "padded" },
}
