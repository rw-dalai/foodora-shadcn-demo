import { CheckoutForm } from "@/features/checkout/CheckoutForm"
import componentSrc from "@/features/checkout/CheckoutForm.jsx?raw"
import cssSrc from "@/features/checkout/checkout.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

export default {
  title: "Composed/CheckoutForm",
  component: CheckoutForm,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
}

export const Default = {
  render: () => (
    <CheckoutForm onSubmit={(data) => console.log("Checkout:", data)} />
  ),
}

export const Source = {
  render: () => (
    <SourceCode
      files={[
        {
          filename: "features/checkout/CheckoutForm.jsx",
          source: componentSrc,
        },
        { filename: "features/checkout/checkout.module.css", source: cssSrc },
      ]}
    />
  ),
  parameters: { layout: "padded" },
}
