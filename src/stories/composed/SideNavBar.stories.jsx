import { useState } from "react"
import { SideNavBar } from "@/features/side-nav/SideNavBar"
import { Button } from "@/components/ui/button"
import componentSrc from "@/features/side-nav/SideNavBar.jsx?raw"
import cssSrc from "@/features/side-nav/side-nav.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

/** Stateful wrapper so the Sheet can open and close in Storybook */
function InteractiveSideNav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      {!open && (
        <div style={{ padding: 24 }}>
          <Button onClick={() => setOpen(true)}>Open Side Nav</Button>
        </div>
      )}
      <SideNavBar open={open} onOpenChange={setOpen} />
    </>
  )
}

export default {
  title: "Composed/SideNavBar",
  component: SideNavBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

export const Open = {
  render: () => <InteractiveSideNav />,
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/side-nav/SideNavBar.jsx", source: componentSrc },
        {
          filename: "features/side-nav/side-nav.module.css",
          source: cssSrc,
        },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
