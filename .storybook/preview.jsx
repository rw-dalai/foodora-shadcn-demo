import { useEffect } from "react"
import { ThemeProvider } from "../src/components/theme-provider"
import "../src/styles/globals.css"

function ThemeWrapper({ theme, children }) {
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    if (theme === "system") {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(sys)
    } else {
      root.classList.add(theme)
    }
  }, [theme])
  return children
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: "Theme für Komponenten",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
          { value: "system", icon: "browser", title: "System" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light"
      return (
        <ThemeProvider defaultTheme={theme} storageKey="storybook-theme">
          <ThemeWrapper theme={theme}>
            <Story />
          </ThemeWrapper>
        </ThemeProvider>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
