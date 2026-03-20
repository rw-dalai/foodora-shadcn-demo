import globalsSrc from "@/styles/globals.css?raw"
import colorsSrc from "@/styles/tokens/colors.css?raw"
import typographySrc from "@/styles/tokens/typography.css?raw"
import sizingSrc from "@/styles/tokens/sizing.css?raw"
import radiusSrc from "@/styles/tokens/radius.css?raw"
import exampleCssSrc from "@/features/auth/auth.module.css?raw"
import { SourceCode } from "@/stories/components/SourceCode"

function ProjectSetup() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 8,
          color: "hsl(var(--foreground))",
        }}
      >
        Project Setup
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "hsl(var(--muted-foreground))",
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        This page shows the root configuration files that power Spengerbite.
        Design tokens are split into{" "}
        <code style={{ color: "hsl(var(--primary))" }}>styles/tokens/</code> by
        concern (colors, typography, sizing, radius). The entry point{" "}
        <code>globals.css</code> imports them all and maps tokens to Tailwind
        utilities via <code>@theme inline</code>. CSS modules use{" "}
        <code style={{ color: "hsl(var(--primary))" }}>@reference</code> to
        access these utilities.
      </p>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
            color: "hsl(var(--foreground))",
          }}
        >
          How it works
        </h2>
        <ol
          style={{
            fontSize: 14,
            lineHeight: 2,
            color: "hsl(var(--foreground))",
            paddingLeft: 20,
          }}
        >
          <li>
            <strong>tokens/*.css</strong> define design tokens as CSS custom
            properties in <code>:root</code> (light) and <code>.dark</code>
          </li>
          <li>
            <strong>globals.css</strong> imports all token files and uses{" "}
            <code>@theme inline</code> to map them to Tailwind utilities (e.g.{" "}
            <code>bg-primary</code>, <code>size-icon-sm</code>,{" "}
            <code>h-control-md</code>, <code>max-w-container-lg</code>)
          </li>
          <li>
            <strong>CSS Modules</strong> use{" "}
            <code>@reference &quot;../../styles/globals.css&quot;</code> at the
            top so <code>@apply</code> can access all theme-aware Tailwind
            classes
          </li>
          <li>
            <strong>Components</strong> import the CSS module as{" "}
            <code>import s from &quot;./name.module.css&quot;</code> and use{" "}
            <code>className=&#123;s.className&#125;</code>
          </li>
        </ol>
      </section>

      <SourceCode
        files={[
          {
            filename: "styles/globals.css — Entry Point + @theme inline",
            source: globalsSrc,
          },
          {
            filename: "styles/tokens/colors.css — Color Tokens",
            source: colorsSrc,
          },
          {
            filename: "styles/tokens/typography.css — Font Size Tokens",
            source: typographySrc,
          },
          {
            filename: "styles/tokens/sizing.css — Icon / Control / Container Tokens",
            source: sizingSrc,
          },
          {
            filename: "styles/tokens/radius.css — Border Radius Tokens",
            source: radiusSrc,
          },
          {
            filename: "features/auth/auth.module.css — Example CSS Module",
            source: exampleCssSrc,
          },
        ]}
      />
    </div>
  )
}

export default {
  title: "Foundations/ProjectSetup",
  component: ProjectSetup,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Root configuration files: design tokens split by concern (colors, typography, sizing, radius), Tailwind v4 theme mapping in globals.css, and CSS module pattern with @reference.",
      },
    },
  },
}

export const Default = {}
