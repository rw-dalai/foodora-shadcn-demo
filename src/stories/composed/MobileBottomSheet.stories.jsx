import { MobileBottomSheet } from "@/features/bottom-sheet/MobileBottomSheet"
import componentSrc from "@/features/bottom-sheet/MobileBottomSheet.jsx?raw"
import cssSrc from "@/features/bottom-sheet/bottom-sheet.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/MobileBottomSheet",
  component: MobileBottomSheet,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <MobileBottomSheet
      open={true}
      onOpenChange={() => {}}
      title="Quick Actions"
    >
      <div className="space-y-4 p-2">
        <p className="text-muted-foreground">
          This is sample bottom sheet content. You can put any UI here.
        </p>
        <ul className="space-y-2 text-sm">
          <li>Share this restaurant</li>
          <li>Add to favorites</li>
          <li>Report an issue</li>
        </ul>
      </div>
    </MobileBottomSheet>
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        {
          filename: "features/bottom-sheet/MobileBottomSheet.jsx",
          source: componentSrc,
        },
        {
          filename: "features/bottom-sheet/bottom-sheet.module.css",
          source: cssSrc,
        },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
