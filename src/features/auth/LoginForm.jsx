import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import s from "./auth.module.css"

export function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <Card className={s.authCard}>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your Spengerbite account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.field}>
            <Label htmlFor="login-email">Email</Label>
            <div className={s.inputWrapper}>
              <Mail className={s.inputIcon} />
              <Input
                id="login-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={s.inputWithIcon}
                required
              />
            </div>
          </div>

          <div className={s.field}>
            <Label htmlFor="login-password">Password</Label>
            <div className={s.inputWrapper}>
              <Lock className={s.inputIcon} />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={s.inputWithIcon}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={s.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-icon-sm" />
                ) : (
                  <Eye className="size-icon-sm" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <p className={s.switchForm}>
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
