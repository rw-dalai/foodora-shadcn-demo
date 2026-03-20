import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
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

export function RegisterForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    onSubmit?.(formData)
  }

  return (
    <Card className={s.authCard}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Sign up to start ordering delicious food
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.field}>
            <Label htmlFor="reg-name">Full Name</Label>
            <div className={s.inputWrapper}>
              <User className={s.inputIcon} />
              <Input
                id="reg-name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={s.inputWithIcon}
                required
              />
            </div>
          </div>

          <div className={s.field}>
            <Label htmlFor="reg-email">Email</Label>
            <div className={s.inputWrapper}>
              <Mail className={s.inputIcon} />
              <Input
                id="reg-email"
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
            <Label htmlFor="reg-password">Password</Label>
            <div className={s.inputWrapper}>
              <Lock className={s.inputIcon} />
              <Input
                id="reg-password"
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

          <div className={s.field}>
            <Label htmlFor="reg-confirm">Confirm Password</Label>
            <div className={s.inputWrapper}>
              <Lock className={s.inputIcon} />
              <Input
                id="reg-confirm"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className={s.inputWithIcon}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>

          <p className={s.switchForm}>
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
