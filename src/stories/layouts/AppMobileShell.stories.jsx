import { AppMobileShell } from "@/features/app-mobile-shell/AppMobileShell"
import componentSrc from "@/features/app-mobile-shell/AppMobileShell.jsx?raw"
import cssSrc from "@/features/app-mobile-shell/app-mobile-shell.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Layouts/AppMobileShell",
  component: AppMobileShell,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <AppMobileShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Mobile Layout</h1>
        <p className="text-muted-foreground">
          Tap the hamburger menu to open the bottom sheet.
        </p>
      </div>
    </AppMobileShell>
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        {
          filename: "features/app-mobile-shell/AppMobileShell.jsx",
          source: componentSrc,
        },
        {
          filename: "features/app-mobile-shell/app-mobile-shell.module.css",
          source: cssSrc,
        },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
