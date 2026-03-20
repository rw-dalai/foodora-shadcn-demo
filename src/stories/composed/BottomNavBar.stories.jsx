import { useState } from "react"
import { BottomNavBar } from "@/features/bottom-nav/BottomNavBar"
import componentSrc from "@/features/bottom-nav/BottomNavBar.jsx?raw"
import cssSrc from "@/features/bottom-nav/bottom-nav.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

/** Stateful wrapper so clicking items updates the active state in Storybook */
function InteractiveBottomNav({ initialItem = "home", cartCount = 0 }) {
  const [activeItem, setActiveItem] = useState(initialItem)
  return (
    <BottomNavBar
      activeItem={activeItem}
      cartCount={cartCount}
      onItemClick={setActiveItem}
    />
  )
}

/**
 * Decorator: renders the nav inside a phone-sized frame and overrides
 * `position: fixed` → `relative` and `md:hidden` → visible so it
 * actually shows up in the Storybook canvas / Docs page.
 */
const MobileFrame = (Story) => (
  <div
    style={{
      width: 375,
      minHeight: 100,
      position: "relative",
      margin: "20px auto",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid hsl(var(--border))",
      background: "hsl(var(--background))",
    }}
  >
    <style>{`
      .sb-mobile-frame nav {
        position: relative !important;
        display: flex !important;
        width: 100% !important;
      }
    `}</style>
    <div className="sb-mobile-frame">
      <Story />
    </div>
  </div>
)

export default {
  title: "Composed/BottomNavBar",
  component: BottomNavBar,
  tags: ["autodocs"],
}

export const Default = {
  decorators: [MobileFrame],
  parameters: { layout: "centered" },
  render: () => <InteractiveBottomNav initialItem="home" cartCount={0} />,
}

export const WithCartBadge = {
  decorators: [MobileFrame],
  parameters: { layout: "centered" },
  render: () => <InteractiveBottomNav initialItem="cart" cartCount={3} />,
}

export const RestaurantsActive = {
  decorators: [MobileFrame],
  parameters: { layout: "centered" },
  render: () => <InteractiveBottomNav initialItem="restaurants" cartCount={1} />,
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/bottom-nav/BottomNavBar.jsx", source: componentSrc },
        { filename: "features/bottom-nav/bottom-nav.module.css", source: cssSrc },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
