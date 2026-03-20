import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import avatarSrc from "@/components/ui/avatar.jsx?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export const Default = () => (
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)

export const WithFallback = () => (
  <div className="flex gap-3">
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>
        <User className="size-icon-sm" />
      </AvatarFallback>
    </Avatar>
  </div>
)

export const Sizes = () => (
  <div className="flex items-end gap-3">
    <Avatar className="size-avatar-sm">
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
    <Avatar className="h-12 w-12">
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
    <Avatar className="h-16 w-16">
      <AvatarFallback>XL</AvatarFallback>
    </Avatar>
  </div>
)

export const Source = {
  render: () => (
    <SourceCode
      files={[{ filename: "components/ui/avatar.jsx", source: avatarSrc }]}
    />
  ),
  parameters: { layout: "padded" },
}
