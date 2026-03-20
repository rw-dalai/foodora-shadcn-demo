import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { User } from "lucide-react"
import s from "./playground.module.css"

export function ComponentPlayground() {
  return (
    <div className={s.playground}>
      <div className={s.header}>
        <h1 className="text-3xl font-bold">Component Playground</h1>
        <ModeToggle />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Different button variants and sizes
          </CardDescription>
        </CardHeader>
        <CardContent className={s.section}>
          <div className={s.grid}>
            <Button>Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className={s.grid}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <User className="size-icon-sm" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status and category indicators</CardDescription>
        </CardHeader>
        <CardContent className={s.section}>
          <div className={s.grid}>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avatars</CardTitle>
          <CardDescription>
            User profile images with fallbacks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={s.grid}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>
                <User className="size-icon-sm" />
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>Inputs and labels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={s.formGrid}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pg-email">Email</Label>
              <Input id="pg-email" type="email" placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pg-password">Password</Label>
              <Input id="pg-password" type="password" placeholder="••••••••" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Separator</CardTitle>
          <CardDescription>Visual dividers</CardDescription>
        </CardHeader>
        <CardContent className={s.section}>
          <p className="text-sm text-muted-foreground">Above separator</p>
          <Separator />
          <p className="text-sm text-muted-foreground">Below separator</p>
        </CardContent>
      </Card>
    </div>
  )
}
