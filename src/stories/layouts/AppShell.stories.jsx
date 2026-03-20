import { AppShell } from "@/features/app-shell/AppShell"
import componentSrc from "@/features/app-shell/AppShell.jsx?raw"
import cssSrc from "@/features/app-shell/app-shell.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Layouts/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Spengerbite</h1>
        <p className="text-muted-foreground">
          Your favorite food, delivered fast.
        </p>
      </div>
    </AppShell>
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/app-shell/AppShell.jsx", source: componentSrc },
        {
          filename: "features/app-shell/app-shell.module.css",
          source: cssSrc,
        },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
