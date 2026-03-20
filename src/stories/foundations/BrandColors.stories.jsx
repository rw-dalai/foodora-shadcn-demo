import { useEffect, useRef, useState } from "react"

const TOKENS = [
  {
    name: "--primary",
    tailwind: "bg-primary",
    lightHsl: "332 98% 42%",
    usage: "Main CTA buttons, links, brand accent",
  },
  {
    name: "--primary-foreground",
    tailwind: "text-primary-foreground",
    lightHsl: "0 0% 100%",
    usage: "Text on primary backgrounds",
  },
  {
    name: "--accent",
    tailwind: "bg-accent",
    lightHsl: "332 100% 96%",
    usage: "Hover highlights, selected states",
  },
  {
    name: "--accent-foreground",
    tailwind: "text-accent-foreground",
    lightHsl: "332 70% 20%",
    usage: "Text on accent backgrounds",
  },
  {
    name: "--background",
    tailwind: "bg-background",
    lightHsl: "0 0% 100%",
    usage: "Page background",
  },
  {
    name: "--foreground",
    tailwind: "text-foreground",
    lightHsl: "240 10% 4%",
    usage: "Default body text",
  },
  {
    name: "--card",
    tailwind: "bg-card",
    lightHsl: "0 0% 100%",
    usage: "Card surfaces",
  },
  {
    name: "--card-foreground",
    tailwind: "text-card-foreground",
    lightHsl: "240 10% 4%",
    usage: "Text on cards",
  },
  {
    name: "--muted",
    tailwind: "bg-muted",
    lightHsl: "220 13% 95%",
    usage: "Disabled states, subtle backgrounds",
  },
  {
    name: "--muted-foreground",
    tailwind: "text-muted-foreground",
    lightHsl: "220 8% 38%",
    usage: "Secondary text, placeholders",
  },
  {
    name: "--border",
    tailwind: "border-border",
    lightHsl: "220 13% 91%",
    usage: "Dividers, input borders",
  },
  {
    name: "--input",
    tailwind: "border-input",
    lightHsl: "220 13% 91%",
    usage: "Input field borders",
  },
  {
    name: "--ring",
    tailwind: "ring-ring",
    lightHsl: "332 98% 42%",
    usage: "Focus rings",
  },
]

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function parseHsl(hslStr) {
  const parts = hslStr.trim().split(/\s+/)
  if (parts.length === 3) {
    return {
      h: parseFloat(parts[0]),
      s: parseFloat(parts[1]),
      l: parseFloat(parts[2]),
    }
  }
  return null
}

function ColorSwatch({ token }) {
  const swatchRef = useRef(null)
  const [liveHsl, setLiveHsl] = useState(token.lightHsl)
  const [hex, setHex] = useState("")

  useEffect(() => {
    if (!swatchRef.current) return
    const computed = getComputedStyle(swatchRef.current)
    const val = computed.getPropertyValue(token.name).trim()
    if (val) setLiveHsl(val)

    const parsed = parseHsl(val || token.lightHsl)
    if (parsed) setHex(hslToHex(parsed.h, parsed.s, parsed.l))
  })

  return (
    <div
      style={{
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        background: "hsl(var(--card))",
      }}
    >
      <div
        ref={swatchRef}
        style={{
          height: 120,
          width: "100%",
          backgroundColor: `hsl(${liveHsl})`,
        }}
      />
      <div style={{ padding: "12px 16px", fontSize: 13 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          <code>{token.name}</code>
        </div>
        <div style={{ color: "hsl(var(--muted-foreground))", marginBottom: 2 }}>
          <code>{token.tailwind}</code>
        </div>
        <div style={{ color: "hsl(var(--muted-foreground))", marginBottom: 2 }}>
          HSL: <code>{liveHsl}</code>
        </div>
        <div style={{ color: "hsl(var(--muted-foreground))", marginBottom: 6 }}>
          HEX: <code>{hex}</code>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "hsl(var(--muted-foreground))",
            fontStyle: "italic",
          }}
        >
          {token.usage}
        </div>
      </div>
    </div>
  )
}

function BrandColors() {
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 4,
          color: "hsl(var(--foreground))",
        }}
      >
        Spengerbite Design Tokens
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "hsl(var(--muted-foreground))",
          marginBottom: 32,
        }}
      >
        Based on foodora public brand assets &mdash; primary reference:{" "}
        <code style={{ color: "hsl(var(--primary))" }}>#D60265</code>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {TOKENS.map((token) => (
          <ColorSwatch key={token.name} token={token} />
        ))}
      </div>
    </div>
  )
}

export default {
  title: "Foundations/BrandColors",
  component: BrandColors,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Visual reference for all semantic design tokens used in Spengerbite. Tokens are defined in src/styles/globals.css and consumed via Tailwind utility classes.",
      },
    },
  },
}

export const Default = {}
