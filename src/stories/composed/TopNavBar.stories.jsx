import { TopNavBar } from "@/features/top-nav/TopNavBar"
import componentSrc from "@/features/top-nav/TopNavBar.jsx?raw"
import cssSrc from "@/features/top-nav/top-nav.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/TopNavBar",
  component: TopNavBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <TopNavBar
      cartCount={0}
      onMenuClick={() => console.log("Menu clicked")}
      onCartClick={() => console.log("Cart clicked")}
    />
  ),
}

export const WithCartItems = {
  render: () => (
    <TopNavBar
      cartCount={5}
      onMenuClick={() => console.log("Menu clicked")}
      onCartClick={() => console.log("Cart clicked")}
    />
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/top-nav/TopNavBar.jsx", source: componentSrc },
        {
          filename: "features/top-nav/top-nav.module.css",
          source: cssSrc,
        },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
