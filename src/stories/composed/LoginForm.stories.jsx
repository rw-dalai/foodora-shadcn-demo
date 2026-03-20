import { LoginForm } from "@/features/auth/LoginForm"
import componentSrc from "@/features/auth/LoginForm.jsx?raw"
import cssSrc from "@/features/auth/auth.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/LoginForm",
  component: LoginForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <LoginForm onSubmit={(data) => console.log("Login:", data)} />
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/auth/LoginForm.jsx", source: componentSrc },
        { filename: "features/auth/auth.module.css", source: cssSrc },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
