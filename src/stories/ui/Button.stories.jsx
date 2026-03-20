import { Button } from "@/components/ui/button"
import { User, Mail, Download } from "lucide-react"
import buttonSrc from "@/components/ui/button.jsx?raw"
import buttonStylesSrc from "@/lib/styles/button.js?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
}

export const Default = {
  args: { children: "Button" },
  render: (args) => <Button {...args} />,
}

export const Variants = () => (
  <div className="flex flex-wrap gap-2">
    <Button>Solid</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="link">Link</Button>
  </div>
)

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <User className="size-icon-sm" />
    </Button>
  </div>
)

export const WithIcons = () => (
  <div className="flex flex-wrap gap-2">
    <Button>
      <Mail className="size-icon-sm" />
      Login with Email
    </Button>
    <Button variant="outline">
      <Download className="size-icon-sm" />
      Download
    </Button>
  </div>
)

export const Disabled = () => (
  <div className="flex flex-wrap gap-2">
    <Button disabled>Disabled</Button>
    <Button variant="outline" disabled>
      Disabled
    </Button>
  </div>
)

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "components/ui/button.jsx", source: buttonSrc },
        { filename: "lib/styles/button.js", source: buttonStylesSrc },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
