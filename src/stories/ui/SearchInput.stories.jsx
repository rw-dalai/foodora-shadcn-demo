import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import inputSrc from "@/components/ui/input.jsx?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "UI/SearchInput",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export const Default = () => (
  <div className="w-96">
    <Input type="search" placeholder="Search restaurants..." />
  </div>
)

export const WithLabel = () => (
  <div className="w-96 space-y-2">
    <Label htmlFor="sb-search">Search</Label>
    <Input id="sb-search" type="search" placeholder="Search restaurants..." />
  </div>
)

export const WithIcon = () => (
  <div className="relative w-96">
    <Search className="absolute left-2.5 top-2.5 size-icon-sm text-muted-foreground" />
    <Input type="search" placeholder="Search..." className="pl-8" />
  </div>
)

export const Source = {
  render: () => (
    <SourceCode
      files={[{ filename: "components/ui/input.jsx", source: inputSrc }]}
    />
  ),
  parameters: { layout: "padded" },
}
