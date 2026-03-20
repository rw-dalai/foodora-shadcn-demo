import { SideNavBar } from "@/features/side-nav/SideNavBar"
import componentSrc from "@/features/side-nav/SideNavBar.jsx?raw"
import cssSrc from "@/features/side-nav/side-nav.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/SideNavBar",
  component: SideNavBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

export const Open = {
  render: () => (
    <SideNavBar open={true} onOpenChange={() => {}} />
  ),
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
