import { SearchBar } from "@/features/search/SearchBar"
import componentSrc from "@/features/search/SearchBar.jsx?raw"
import cssSrc from "@/features/search/search-bar.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/SearchBar",
  component: SearchBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <SearchBar onSearch={(data) => console.log("Search:", data)} />
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/search/SearchBar.jsx", source: componentSrc },
        {
          filename: "features/search/search-bar.module.css",
          source: cssSrc,
        },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
