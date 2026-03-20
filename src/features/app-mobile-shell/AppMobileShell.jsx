import { useState } from "react"
import { TopNavBar } from "@/features/top-nav/TopNavBar"
import { MobileBottomSheet } from "@/features/bottom-sheet/MobileBottomSheet"
import s from "./app-mobile-shell.module.css"

export function AppMobileShell({ children }) {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className={s.mobileShell}>
      <TopNavBar onMenuClick={() => setSheetOpen(true)} cartCount={3} />
      <MobileBottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Quick Actions"
      >
        <p className="text-muted-foreground">Mobile bottom sheet content here</p>
      </MobileBottomSheet>
      <main className={s.main}>{children}</main>
    </div>
  )
}
