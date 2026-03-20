import { RegisterForm } from "@/features/auth/RegisterForm"
import componentSrc from "@/features/auth/RegisterForm.jsx?raw"
import cssSrc from "@/features/auth/auth.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/RegisterForm",
  component: RegisterForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <RegisterForm onSubmit={(data) => console.log("Register:", data)} />
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        { filename: "features/auth/RegisterForm.jsx", source: componentSrc },
        { filename: "features/auth/auth.module.css", source: cssSrc },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
