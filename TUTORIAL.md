# SpengerBite CSS-Architektur: Tutorial

## Einleitung

Wir bauen das CSS-Fundament für **SpengerBite**, eine Food-Delivery-App (ähnlich Foodora). In diesem Tutorial lernst du die **CSS-Architektur** hinter einem modernen React-Projekt: von Design Tokens über Tailwind CSS bis hin zu CSS Modules und Dark Mode.

Das fertige Referenzprojekt mit **Storybook** findest du in diesem Repository. Dort kannst du jede Komponente inspizieren, den Source Code kopieren und live testen.

### Was wir lernen

| Konzept | Beschreibung |
|---------|-------------|
| **Projekt-Setup** | React + Vite + Tailwind CSS v4 + shadcn/ui |
| **Tailwind CSS** | Utility-First CSS: Layout, Flexbox, Grid, Spacing |
| **Design Tokens** | Zentrale Designvariablen als CSS Custom Properties |
| **@theme inline** | Brücke zwischen Design Tokens und Tailwind-Klassen |
| **CSS Modules** | Scoped Component-Styles mit `@apply` |
| **CVA** | Class Variance Authority: Varianten-Management für Komponenten |
| **Theming** | Light/Dark Mode mit CSS-Klassen und Context |

### Ordnerstruktur (Endergebnis)

```
mein-projekt/
├── package.json
├── vite.config.js                    <- Vite + Tailwind + @-Alias
├── jsconfig.json                     <- @/-Alias für VS Code
├── src/
│   ├── main.jsx                      <- Einstiegspunkt mit ThemeProvider
│   ├── App.jsx                       <- Hauptkomponente
│   ├── styles/
│   │   ├── globals.css               <- Entry: @import + @theme inline
│   │   └── tokens/
│   │       ├── colors.css            <- Farb-Tokens (Light + Dark)
│   │       ├── typography.css        <- Schriftgrößen-Tokens
│   │       ├── sizing.css            <- Icon/Control/Container-Tokens
│   │       └── radius.css            <- Border-Radius-Token
│   ├── lib/
│   │   ├── utils.js                  <- cn() Hilfsfunktion
│   │   └── styles/
│   │       └── button.js             <- CVA Button-Varianten
│   ├── components/
│   │   ├── theme-provider.jsx        <- Dark/Light Mode Context
│   │   ├── mode-toggle.jsx           <- Theme-Umschalter
│   │   └── ui/                       <- shadcn/ui Komponenten
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── card.jsx
│   │       └── ...
│   └── features/
│       └── auth/
│           ├── LoginForm.jsx         <- Zusammengesetzte Komponente
│           ├── RegisterForm.jsx      <- DEINE AUFGABE
│           └── auth.module.css       <- CSS Module für Auth
```

### Was du selbst implementierst

Am Ende dieses Tutorials fehlt eine Sache, die **du** als Aufgabe implementierst:
- Die `RegisterForm`-Komponente, aufgebaut aus den shadcn-Bausteinen (Card, Input, Label, Button)

---

# Teil 1: Projekt-Setup

In den ersten vier Schritten erstellen wir das Projektgerüst: Vite als Build-Tool, Tailwind CSS v4 für das Styling, einen Import-Alias für saubere Pfade und shadcn/ui als Komponentenbibliothek.

---

## Schritt 1: Projekt erstellen

```bash
npm create vite@latest mein-projekt -- --template react
cd mein-projekt
npm install
```

> Vite ist ein modernes Build-Tool für Frontend-Projekte. Es startet den Dev-Server in Millisekunden und unterstützt Hot Module Replacement (HMR). Änderungen im Code werden sofort im Browser sichtbar.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Vite | `npm create vite@latest` mit `--template react` | Schneller Dev-Server, startet in Millisekunden |
| HMR | Vite erkennt Dateiänderungen automatisch | Code-Änderungen sofort im Browser sichtbar, kein Reload nötig |

---

## Schritt 2: Tailwind CSS v4 installieren

```bash
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
```

Erstelle die Datei `src/styles/globals.css`:

```css
@import "tailwindcss";
```

> **Tailwind CSS v4** ist komplett CSS-basiert. Es gibt **keine** `tailwind.config.js` mehr. Alles wird direkt in CSS konfiguriert. Das ist ein großer Unterschied zu Tailwind v3!

### Was passiert hier?

In Tailwind v4 reicht `@import "tailwindcss"` als einzige Zeile. Tailwind scannt automatisch alle Dateien und generiert nur die CSS-Klassen, die tatsächlich verwendet werden. Die Konfiguration erfolgt später über `@theme inline` direkt in CSS.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Tailwind v4 | CSS-First: `@import "tailwindcss"` statt JS-Config | Kein `tailwind.config.js` nötig, alles in CSS |
| Vite Plugin | `@tailwindcss/vite` Plugin im Build-Prozess | Tailwind wird automatisch beim Build verarbeitet |

---

## Schritt 3: Path-Alias `@/` konfigurieren

Damit wir Imports so schreiben können:
```javascript
import { Button } from '@/components/ui/button'   // kurz & klar
// statt:
import { Button } from '../../../components/ui/button'   // hässlich
```

### vite.config.js

Ersetze die Datei komplett:

```javascript
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### jsconfig.json

Erstelle diese Datei im **Projekt-Root** (nicht in `src/`):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Was passiert hier?

| Datei | Zweck |
|-------|-------|
| `vite.config.js` | Vite löst `@` zur **Build-Zeit** auf |
| `jsconfig.json` | VS Code versteht `@` für **Autovervollständigung** |

Beide sind nötig. Sonst funktioniert entweder der Build oder die IDE nicht.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Path-Alias `@/` | `vite.config.js` (Build) + `jsconfig.json` (IDE) | Saubere Imports statt `../../..` |
| Dual-Config | Vite braucht den Alias für den Build, VS Code für Autovervollständigung | Beide Tools müssen den Alias unabhängig kennen |

---

## Schritt 4: shadcn/ui initialisieren

[shadcn/ui](https://ui.shadcn.com) ist eine Sammlung von fertigen, schön gestalteten React-Komponenten (Buttons, Cards, Inputs, ...). Die Komponenten werden direkt in dein Projekt kopiert. Du kannst sie jederzeit anpassen.

> **Wichtig:** shadcn ist kein npm-Paket! Die Dateien werden in `src/components/ui/` kopiert und gehören dann **dir**. Du kannst sie frei ändern. Das unterscheidet shadcn von klassischen Component Libraries wie Material UI.

```bash
npx shadcn@latest init -d
```

Das erstellt:
1. `components.json`: shadcn-Konfiguration
2. `src/lib/utils.js`: die `cn()` Hilfsfunktion zum Zusammenführen von CSS-Klassen

### Komponenten installieren

```bash
npx shadcn@latest add button card input label avatar badge separator
```

Das installiert 7 Komponenten in `src/components/ui/`.

### Zusätzliche Pakete

```bash
npm install lucide-react
```

| Paket | Zweck |
|-------|-------|
| **lucide-react** | Icon-Bibliothek (Mail, Lock, Eye, User, ...) |

### Was passiert hier?

**`cn()` Funktion** aus `src/lib/utils.js`:

```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

`cn()` merged CSS-Klassen intelligent. Wenn zwei Klassen kollidieren (z.B. `p-4` und `p-6`), gewinnt die letzte:

```javascript
cn("p-4 bg-primary", "p-6")   // → "bg-primary p-6"  (p-6 überschreibt p-4)
```

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| shadcn/ui | `npx shadcn add` kopiert Komponenten in `src/components/ui/` | Fertige UI-Komponenten, die du anpassen kannst |
| `cn()` | `clsx` + `tailwind-merge` in einer Funktion | Merged Tailwind-Klassen intelligent (Standard + Überschreibung) |
| Lucide | `import { Mail } from "lucide-react"` | 1500+ Icons als React-Komponenten |

---

# Teil 2: Was ist Tailwind CSS?

Tailwind CSS ist ein **Utility-First CSS-Framework**. Statt eigene CSS-Klassen zu schreiben, verwendet man vordefinierte Klassen direkt im JSX. Tailwind ist besonders stark für **Layout** — Flexbox, Grid, Spacing, Responsive Design.

---

## Schritt 5: Utility-First CSS verstehen

### Traditionelles CSS vs. Tailwind

**Traditionell:** CSS-Klassen definieren, dann im HTML verwenden.

```css
/* styles.css */
.card-container {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  max-width: 48rem;
  margin: 0 auto;
}
```
```html
<div class="card-container">...</div>
```

**Tailwind:** Utility-Klassen direkt im JSX, kein separates CSS nötig.

```jsx
<div className="flex gap-4 p-6 max-w-3xl mx-auto">...</div>
```

### Layout-Klassen: Flexbox

```jsx
{/* Horizontal zentriert mit Abstand */}
<div className="flex items-center justify-between gap-4">
  <span>Links</span>
  <span>Rechts</span>
</div>

{/* Vertikal gestapelt */}
<div className="flex flex-col gap-2">
  <label>Email</label>
  <input />
</div>
```

### Layout-Klassen: Grid

```jsx
{/* Responsive Grid: 1 Spalte → 2 → 3 */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  <div>Karte 1</div>
  <div>Karte 2</div>
  <div>Karte 3</div>
</div>
```

### Responsive Design

Tailwind verwendet **Breakpoint-Prefixes**. Klassen ohne Prefix gelten für **alle** Bildschirmgrößen (Mobile First):

```
                    sm:          md:          lg:          xl:
                    ≥640px       ≥768px       ≥1024px      ≥1280px
├─── Mobile ────────┤──── Tablet ──┤─── Desktop ─┤──── Wide ───┤
```

```jsx
{/* Mobile: 1 Spalte, Tablet: 2 Spalten, Desktop: 3 Spalten */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
```

### Spacing & Sizing

| Klasse | CSS | Pixel |
|--------|-----|-------|
| `p-4` | `padding: 1rem` | 16px |
| `m-2` | `margin: 0.5rem` | 8px |
| `gap-6` | `gap: 1.5rem` | 24px |
| `w-full` | `width: 100%` | — |
| `h-10` | `height: 2.5rem` | 40px |
| `space-y-4` | vertikaler Abstand zwischen Kindern | 16px |

> **Wichtig:** Tailwind ist für **Layout** (Flexbox, Grid, Spacing, Responsive). Für **Branding** und **Theming** (Farben, Schriftgrößen, Icon-Größen) verwenden wir **Design Tokens**. Das ist der nächste Schritt.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Utility-First | Klassen direkt im JSX: `className="flex gap-4 p-6"` | Kein separates CSS nötig, schneller Workflow |
| Responsive | Breakpoint-Prefixes: `md:grid-cols-2` | Mobile First: kleine Bildschirme zuerst |
| Flexbox | `flex`, `items-center`, `justify-between`, `gap-*` | Horizontales/vertikales Layout |
| Grid | `grid`, `grid-cols-*`, `gap-*` | Raster-Layout für Karten, Listen |

---

# Teil 3: Die 3 Ebenen unserer CSS-Architektur

Unser Projekt verwendet drei CSS-Ebenen, die aufeinander aufbauen. Zusammen bilden sie eine saubere, wartbare CSS-Architektur.

---

## Schritt 6: Überblick — Die CSS-Pyramide

```
┌─────────────────────────────────────────┐
│  Ebene 3: CSS Modules                  │  ← Scoped Component-Styles
│  auth.module.css, cart.module.css       │    @apply + @reference
├─────────────────────────────────────────┤
│  Ebene 2: Tailwind Utilities           │  ← Die Brücke
│  globals.css → @theme inline           │    Tokens → Tailwind-Klassen
├─────────────────────────────────────────┤
│  Ebene 1: Design Tokens               │  ← Single Source of Truth
│  tokens/colors.css, sizing.css, ...    │    CSS Custom Properties
└─────────────────────────────────────────┘
```

**So funktioniert der Datenfluss:**

```
1. tokens/sizing.css       →  --icon-sm: 1rem
2. globals.css @theme      →  --spacing-icon-sm: var(--icon-sm)   → erzeugt: size-icon-sm
3. auth.module.css @apply  →  @apply size-icon-sm                 → verwendet die Klasse
```

Ein Wert in `sizing.css` ändern → alle Komponenten, die `size-icon-sm` verwenden, aktualisieren sich automatisch.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Ebene 1 | CSS Custom Properties in `:root` | Eine Stelle ändern → globaler Effekt |
| Ebene 2 | `@theme inline` in `globals.css` | Tokens werden zu Tailwind-Klassen |
| Ebene 3 | CSS Modules mit `@apply` | Scoped Styles pro Komponente |

---

## Schritt 7: Ebene 1 — Design Tokens

**Design Tokens** sind benannte Design-Entscheidungen, gespeichert als CSS Custom Properties (Variablen). Statt überall `1rem` zu schreiben, definierst du einmal `--icon-sm: 1rem`. Änderst du den Wert, aktualisieren sich alle Komponenten.

### Ordnerstruktur erstellen

```bash
mkdir -p src/styles/tokens
```

### tokens/colors.css — Farb-Tokens

Erstelle `src/styles/tokens/colors.css`:

```css
:root {
  --primary:            332 98% 42%;    /* #D60265 — brand pink */
  --primary-foreground: 0 0% 100%;

  --accent:            332 100% 96%;
  --accent-foreground: 332 70% 20%;

  --background:        0 0% 100%;
  --foreground:        240 10% 4%;

  --card:              0 0% 100%;
  --card-foreground:   240 10% 4%;

  --popover:            0 0% 100%;
  --popover-foreground: 240 10% 4%;

  --secondary:            220 13% 95%;
  --secondary-foreground: 240 10% 4%;

  --muted:            220 13% 95%;
  --muted-foreground: 220 8% 38%;

  --destructive:            0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  --border: 220 13% 91%;
  --input:  220 13% 91%;
  --ring:   332 98% 42%;
}

.dark {
  --primary:            332 90% 55%;
  --primary-foreground: 240 10% 6%;

  --accent:            332 45% 18%;
  --accent-foreground: 0 0% 98%;

  --background:        240 10% 6%;
  --foreground:        0 0% 98%;

  --card:              240 10% 8%;
  --card-foreground:   0 0% 98%;

  --popover:            240 10% 8%;
  --popover-foreground: 0 0% 98%;

  --secondary:            240 5% 17%;
  --secondary-foreground: 0 0% 98%;

  --muted:            240 5% 20%;
  --muted-foreground: 240 5% 65%;

  --destructive:            0 63% 31%;
  --destructive-foreground: 0 0% 98%;

  --border: 240 5% 20%;
  --input:  240 5% 20%;
  --ring:   332 90% 55%;
}
```

> **HSL-Format:** Die Farben werden als `H S% L%` gespeichert (ohne `hsl()`-Wrapper). So kann Tailwind die Farben mit Opacity kombinieren: `bg-primary/90` erzeugt 90% Deckkraft.

**Zwei Blöcke:**
- `:root` → Light Mode (Standard)
- `.dark` → Dark Mode (wenn `<html class="dark">`)

### tokens/typography.css — Schriftgrößen-Tokens

Erstelle `src/styles/tokens/typography.css`:

```css
:root {
  --text-heading:    1.5rem;   /* 24px — Seitentitel             */
  --text-subheading: 1.125rem; /* 18px — Abschnittstitel          */
  --text-body:       0.875rem; /* 14px — Standard-Fließtext       */
  --text-caption:    0.75rem;  /* 12px — kleine Labels, Badges    */
}
```

### tokens/sizing.css — Größen-Tokens

Erstelle `src/styles/tokens/sizing.css`:

```css
:root {
  /* ── Icon-Größen ── */
  --icon-xs: 0.75rem;   /* 12px — kleine +/- Icons            */
  --icon-sm: 1rem;      /* 16px — Inline-Icons (Eye, Search)   */
  --icon-md: 1.25rem;   /* 20px — Nav-Icons, Titel-Icons       */
  --icon-lg: 3rem;      /* 48px — Leer-Zustand Illustration    */

  /* ── Button / Input Höhen ── */
  --control-sm: 2rem;     /* 32px — kleine Buttons    */
  --control-md: 2.25rem;  /* 36px — Standard Buttons & Inputs */
  --control-lg: 2.5rem;   /* 40px — große Buttons     */

  /* ── Avatar-Größen ── */
  --avatar-sm: 2rem;   /* 32px — Nav-Avatar       */
  --avatar:    2.5rem; /* 40px — Standard-Avatar  */

  /* ── Container-Maximalbreiten ── */
  --container-sm: 28rem;  /* 448px — Auth-Karten   */
  --container-md: 48rem;  /* 768px — Checkout      */
  --container-lg: 80rem;  /* 1280px — App-Shell    */
}
```

### tokens/radius.css — Border-Radius-Token

Erstelle `src/styles/tokens/radius.css`:

```css
:root {
  --radius: 1rem;
}
```

### Was passiert hier?

Die Token-Dateien definieren **nur** CSS Custom Properties. Sie erzeugen noch keine Tailwind-Klassen! Das passiert erst in Schritt 8 mit `@theme inline`.

**Live-Test:** Ändere `--icon-sm: 1rem` auf `--icon-sm: 1.5rem` → alle kleinen Icons in der App werden 50% größer. Ändere `--primary: 332 98% 42%` auf `--primary: 200 98% 42%` → die Brand-Farbe wechselt von Pink zu Blau. **Ein Wert, globaler Effekt.**

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Design Tokens | CSS Custom Properties in `:root` | Benannte Werte: `--icon-sm` statt `1rem` überall |
| Split by Concern | 4 Dateien: colors, typography, sizing, radius | Jede Datei hat eine Verantwortung |
| Light/Dark | `:root` (Light) + `.dark` (Dark) | Gleiche Variablennamen, andere Werte |
| HSL ohne Wrapper | `332 98% 42%` statt `hsl(332, 98%, 42%)` | Tailwind kann Opacity anfügen: `bg-primary/90` |

---

## Schritt 8: Ebene 2 — @theme inline

`@theme inline` ist die **Brücke** zwischen deinen Design Tokens und Tailwind-Klassen. Es nimmt CSS-Variablen und macht daraus nutzbare Utility-Klassen wie `bg-primary`, `size-icon-sm` oder `max-w-container-lg`.

### globals.css aktualisieren

Ersetze `src/styles/globals.css` komplett:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* ── Token-Dateien importieren ── */
@import "./tokens/colors.css";
@import "./tokens/typography.css";
@import "./tokens/sizing.css";
@import "./tokens/radius.css";

@custom-variant dark (&:is(.dark *));

/* ── Design Tokens → Tailwind Utilities ──
   @theme inline MUSS in der Datei mit @import "tailwindcss" stehen.
   Token-Dateien oben definieren :root / .dark CSS Custom Properties.
   Dieser Block verwandelt sie in Tailwind-Klassen. */

@theme inline {
  /* Farben → bg-primary, text-foreground, border-border, etc. */
  --color-background:          hsl(var(--background));
  --color-foreground:          hsl(var(--foreground));

  --color-card:                hsl(var(--card));
  --color-card-foreground:     hsl(var(--card-foreground));

  --color-popover:             hsl(var(--popover));
  --color-popover-foreground:  hsl(var(--popover-foreground));

  --color-primary:             hsl(var(--primary));
  --color-primary-foreground:  hsl(var(--primary-foreground));

  --color-secondary:             hsl(var(--secondary));
  --color-secondary-foreground:  hsl(var(--secondary-foreground));

  --color-accent:              hsl(var(--accent));
  --color-accent-foreground:   hsl(var(--accent-foreground));

  --color-muted:               hsl(var(--muted));
  --color-muted-foreground:    hsl(var(--muted-foreground));

  --color-destructive:             hsl(var(--destructive));
  --color-destructive-foreground:  hsl(var(--destructive-foreground));

  --color-border: hsl(var(--border));
  --color-input:  hsl(var(--input));
  --color-ring:   hsl(var(--ring));

  /* Border-Radius → rounded-lg, rounded-md, rounded-sm */
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  /* Typografie → text-heading, text-subheading, text-body, text-caption */
  --font-size-heading:    var(--text-heading);
  --font-size-subheading: var(--text-subheading);
  --font-size-body:       var(--text-body);
  --font-size-caption:    var(--text-caption);

  /* Icon-Größen → size-icon-xs, size-icon-sm, size-icon-md, size-icon-lg */
  --spacing-icon-xs: var(--icon-xs);
  --spacing-icon-sm: var(--icon-sm);
  --spacing-icon-md: var(--icon-md);
  --spacing-icon-lg: var(--icon-lg);

  /* Control-Höhen → h-control-sm, h-control-md, h-control-lg */
  --spacing-control-sm: var(--control-sm);
  --spacing-control-md: var(--control-md);
  --spacing-control-lg: var(--control-lg);

  /* Avatar-Größen → size-avatar-sm, size-avatar */
  --spacing-avatar-sm: var(--avatar-sm);
  --spacing-avatar:    var(--avatar);

  /* Container-Breiten → max-w-container-sm, max-w-container-md, max-w-container-lg */
  --max-width-container-sm: var(--container-sm);
  --max-width-container-md: var(--container-md);
  --max-width-container-lg: var(--container-lg);
}

/* ── Base Layer ── */

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Was passiert hier?

**Tailwind v4 Namespaces:** Der Variablenname in `@theme inline` bestimmt, welche Utility-Klassen erzeugt werden:

| Namespace in @theme | Erzeugte Tailwind-Klassen | Beispiel |
|---------------------|---------------------------|---------|
| `--color-*` | `bg-*`, `text-*`, `border-*` | `--color-primary` → `bg-primary`, `text-primary` |
| `--spacing-*` | `w-*`, `h-*`, `size-*`, `p-*`, `gap-*` | `--spacing-icon-sm` → `size-icon-sm`, `w-icon-sm` |
| `--font-size-*` | `text-*` | `--font-size-heading` → `text-heading` |
| `--radius-*` | `rounded-*` | `--radius-lg` → `rounded-lg` |
| `--max-width-*` | `max-w-*` | `--max-width-container-sm` → `max-w-container-sm` |

**Namenskonvention:** Um Selbstreferenz zu vermeiden, verwenden die Tokens **kurze Namen** in `:root`, und `@theme inline` fügt den Namespace hinzu:

```
Token (Ebene 1):     --icon-sm: 1rem
@theme (Ebene 2):    --spacing-icon-sm: var(--icon-sm)
Tailwind-Klasse:     size-icon-sm  /  w-icon-sm  /  h-icon-sm
```

Das gleiche Muster bei Farben:

```
Token (Ebene 1):     --primary: 332 98% 42%
@theme (Ebene 2):    --color-primary: hsl(var(--primary))
Tailwind-Klasse:     bg-primary  /  text-primary  /  border-primary
```

**`@layer base`**: Setzt Standardwerte für alle Elemente. `border-border` setzt die Standard-Rahmenfarbe, `bg-background text-foreground` setzt die Standard-Hintergrund- und Textfarbe.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| `@theme inline` | Variablen mit Namespace-Prefix | Verwandelt CSS Custom Properties in Tailwind-Klassen |
| Namespaces | `--color-*`, `--spacing-*`, `--font-size-*`, `--max-width-*` | Tailwind erkennt am Prefix, welche Klassen es erzeugen soll |
| Selbstreferenz vermeiden | Token: `--icon-sm`, Theme: `--spacing-icon-sm: var(--icon-sm)` | `--spacing-icon-sm: var(--spacing-icon-sm)` wäre ein Zirkelbezug |
| `@layer base` | Standard-Styles für `*` und `body` | Globale Defaults setzen |

---

## Schritt 9: Ebene 3 — CSS Modules

**CSS Modules** sind CSS-Dateien mit der Endung `.module.css`. Der Build-Prozess macht alle Klassennamen **einzigartig** (z.B. `.form` → `.auth_form_x7k2`). Dadurch gibt es keine Namenskollisionen zwischen Komponenten.

### Wie man ein CSS Module erstellt

**1. Datei erstellen:** `features/auth/auth.module.css`

```css
@reference "../../styles/globals.css";

.authCard {
  @apply mx-auto w-full max-w-container-sm;
}

.form {
  @apply flex flex-col gap-4;
}

.field {
  @apply flex flex-col gap-2;
}

.inputWrapper {
  @apply relative;
}

.inputIcon {
  @apply pointer-events-none absolute left-3 top-1/2 z-10 size-icon-sm -translate-y-1/2 text-muted-foreground;
}

.inputWithIcon {
  padding-left: 2.5rem;
}

.togglePassword {
  @apply absolute right-0 top-1/2 -translate-y-1/2;
}

.switchForm {
  @apply text-center text-sm text-muted-foreground;
}
```

**2. In der Komponente importieren:**

```jsx
import s from "./auth.module.css"
```

**3. Klassen verwenden:**

```jsx
<Card className={s.authCard}>
  <form className={s.form}>
    <div className={s.field}>
      ...
    </div>
  </form>
</Card>
```

### Was passiert hier?

**`@reference "../../styles/globals.css"`**: Diese Zeile gibt dem CSS Module Zugang zu allen Tailwind-Klassen. Ohne `@reference` kennt `@apply` die Klassen wie `size-icon-sm` oder `max-w-container-sm` nicht.

**`@apply` vs. inline Tailwind:** Wann was verwenden?

| Situation | Verwende | Beispiel |
|-----------|----------|---------|
| Einfaches Layout | Inline Tailwind | `className="flex gap-4 p-6"` |
| Wiederholte Patterns | CSS Module + `@apply` | `.inputIcon` mit 6 Klassen |
| Design Token Referenz | CSS Module + `@apply` | `@apply size-icon-sm max-w-container-sm` |
| Nicht-Tailwind CSS | CSS Module (plain) | `padding-left: 2.5rem;` |

> **Faustregel:** Verwende inline Tailwind für einfache, einmalige Layouts. Verwende CSS Modules, wenn du viele Klassen gruppieren willst oder wenn ein Klassenname semantisch sein soll (`.inputIcon` statt einer langen Tailwind-Kette).

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| CSS Modules | `name.module.css` → automatisch scoped | Keine Namenskollisionen zwischen Komponenten |
| `@reference` | Erste Zeile im CSS Module | Gibt `@apply` Zugang zu Tailwind + Design-Token-Klassen |
| `@apply` | `@apply flex gap-4 bg-primary` | Tailwind-Klassen in CSS-Klassen zusammenfassen |
| Import | `import s from "./name.module.css"` | `s` enthält alle Klassen als Objekt |
| Usage | `className={s.myClass}` | Benutzt die gescoped'te CSS-Klasse |

---

# Teil 4: CVA & Theming

Jetzt lernen wir zwei fortgeschrittene Techniken: CVA für Komponenten-Varianten (Button mit 5 Styles und 4 Größen) und das Theme-System für Light/Dark Mode.

---

## Schritt 10: CVA (Class Variance Authority)

**CVA** ist eine Funktion, die CSS-Klassen basierend auf `variant`- und `size`-Props generiert. Statt lange `if/else`-Ketten zu schreiben, definierst du Varianten deklarativ.

### lib/styles/button.js

```javascript
import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  // Base-Klassen (immer aktiv)
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-control-sm px-3 text-sm",
        md: "h-control-md px-4 text-sm",
        lg: "h-control-lg px-5 text-base",
        icon: "h-control-md w-control-md",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
)
```

### Was passiert hier?

**Aufbau eines CVA-Aufrufs:**

```
cva(
  base,           ← Klassen, die IMMER gelten
  {
    variants: {    ← Varianten-Definitionen
      variant: {   ← Prop-Name
        solid: "", ← Wert → Klassen
        ghost: "",
      },
      size: {      ← Zweiter Prop-Name
        sm: "",
        md: "",
      },
    },
    defaultVariants: {  ← Standard wenn kein Prop übergeben
      variant: "solid",
      size: "md",
    },
  }
)
```

**Verwendung in der Komponente** (`components/ui/button.jsx`):

```jsx
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/styles/button"

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

**So wird es aufgerufen:**

```jsx
<Button>Click me</Button>                    {/* solid + md (defaults) */}
<Button variant="outline" size="sm">Small</Button>
<Button variant="destructive" size="lg">Delete</Button>
<Button size="icon"><User className="size-icon-sm" /></Button>
```

> Beachte: Die Size-Varianten verwenden unsere Design Tokens! `h-control-sm`, `h-control-md`, `h-control-lg`. Änderst du `--control-md` in `sizing.css`, ändern sich alle Buttons und Inputs automatisch.

**CVA wird auch im Badge verwendet** (`components/ui/badge.jsx`):

```javascript
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ...",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow ...",
        secondary: "border-transparent bg-secondary text-secondary-foreground ...",
        destructive: "border-transparent bg-destructive text-destructive-foreground ...",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
)
```

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| CVA | `cva(base, { variants, defaultVariants })` | Deklaratives Varianten-Management statt if/else |
| Base-Klassen | Erster Parameter von `cva()` | Gelten immer, unabhängig von der Variante |
| Varianten | `variant: { solid: "...", ghost: "..." }` | Jede Variante hat eigene CSS-Klassen |
| Default-Varianten | `defaultVariants: { variant: "solid" }` | Werden verwendet wenn kein Prop übergeben wird |
| `cn()` + CVA | `cn(buttonVariants({ variant, size, className }))` | CVA generiert Klassen, `cn()` merged mit Custom-Klassen |

---

## Schritt 11: Theming — Light & Dark Mode

Unser Theme-System basiert auf einer einfachen Idee: Die CSS-Klasse `dark` auf dem `<html>`-Element steuert, welche Farben gelten.

### Wie es funktioniert

```
<html>           →  :root { --primary: 332 98% 42% }    ← Light Mode (Pink)
<html class="dark"> →  .dark { --primary: 332 90% 55% }  ← Dark Mode (helleres Pink)
```

Die **gleichen Variablennamen** haben in `.dark` andere Werte. Alle Komponenten, die `bg-primary` verwenden, passen sich automatisch an.

### ThemeProvider

Der `ThemeProvider` ist ein React Context, der die aktuelle Theme-Einstellung verwaltet:

```jsx
// src/components/theme-provider.jsx
import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "spengerbite-ui-theme",
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

### Was passiert hier?

1. **`useState`**: speichert das aktuelle Theme (`"light"`, `"dark"`, oder `"system"`)
2. **`localStorage`**: merkt sich die Wahl des Benutzers über Browser-Neustarts hinweg
3. **`useEffect`**: setzt die CSS-Klasse `dark` oder `light` auf `<html>` wenn sich das Theme ändert
4. **`system`**: erkennt die Betriebssystem-Einstellung über `prefers-color-scheme`
5. **Context**: `useTheme()` Hook gibt überall Zugang zum Theme

**In `main.jsx` einbinden:**

```jsx
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="spengerbite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)
```

**In `globals.css`** aktiviert diese Zeile den `dark:` Prefix für Tailwind:

```css
@custom-variant dark (&:is(.dark *));
```

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Dark Mode | `.dark`-Klasse auf `<html>` | CSS-Variablen in `.dark {}` überschreiben die Light-Werte |
| ThemeProvider | React Context + localStorage | Theme-Zustand global verfügbar + über Neustarts gespeichert |
| `useTheme()` | Custom Hook: `const { theme, setTheme } = useTheme()` | Theme von überall lesen und ändern |
| System-Erkennung | `prefers-color-scheme` Media Query | Betriebssystem-Einstellung automatisch übernehmen |
| `@custom-variant` | `dark (&:is(.dark *))` | Tailwinds `dark:` Prefix funktioniert mit unserer CSS-Klasse |

---

# Teil 5: Tutorial — LoginForm bauen

Jetzt setzen wir alles zusammen! Wir bauen die `LoginForm`-Komponente Schritt für Schritt — mit shadcn-Bausteinen (Card, Input, Label, Button), CSS Modules und Design Tokens.

---

## Schritt 12: Komponente planen

Bevor wir Code schreiben, planen wir die Komponente:

**UI-Elemente:**
- Eine Card als Container (shadcn `Card`, `CardHeader`, `CardContent`)
- Zwei Formularfelder: Email und Passwort (shadcn `Input`, `Label`)
- Icons in den Feldern (Lucide `Mail`, `Lock`)
- Passwort ein-/ausblenden (Lucide `Eye`, `EyeOff`)
- Submit-Button (shadcn `Button`)
- Link zum Registrieren

**State:**
- `formData`: Objekt mit `email` und `password`
- `showPassword`: Boolean für Passwort-Sichtbarkeit

**Benötigte Komponenten:**

| shadcn Komponente | Verwendung |
|-------------------|-----------|
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` | Formular-Container |
| `Input` | Email- und Passwort-Felder |
| `Label` | Feldbeschriftungen |
| `Button` | Submit + Passwort-Toggle |

---

## Schritt 13: CSS Module erstellen

Erstelle `src/features/auth/auth.module.css`:

```css
@reference "../../styles/globals.css";

.authCard {
  @apply mx-auto w-full max-w-container-sm;
}

.form {
  @apply flex flex-col gap-4;
}

.field {
  @apply flex flex-col gap-2;
}

.inputWrapper {
  @apply relative;
}

.inputIcon {
  @apply pointer-events-none absolute left-3 top-1/2 z-10 size-icon-sm -translate-y-1/2 text-muted-foreground;
}

.inputWithIcon {
  padding-left: 2.5rem;
}

.togglePassword {
  @apply absolute right-0 top-1/2 -translate-y-1/2;
}

.switchForm {
  @apply text-center text-sm text-muted-foreground;
}
```

### Was passiert hier?

| Klasse | Aufgabe | Design-Token |
|--------|---------|-------------|
| `.authCard` | Zentrierte Karte mit maximaler Breite | `max-w-container-sm` (448px) |
| `.form` | Vertikaler Stapel mit Abständen | — |
| `.field` | Label + Input gruppiert | — |
| `.inputWrapper` | Container für absolut positionierte Icons | — |
| `.inputIcon` | Icon links im Input-Feld, vertikal zentriert | `size-icon-sm` (16px) |
| `.inputWithIcon` | Extra Padding links für das Icon | — |
| `.togglePassword` | Eye-Icon rechts im Passwort-Feld | — |
| `.switchForm` | "Don't have an account?" Text | — |

> **`size-icon-sm`** und **`max-w-container-sm`** sind unsere Design Tokens aus `sizing.css`! Änderst du `--icon-sm` oder `--container-sm`, aktualisieren sich alle Formulare.

---

## Schritt 14: LoginForm.jsx bauen

Erstelle `src/features/auth/LoginForm.jsx`:

```jsx
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
```

### Was passiert hier?

**Imports:** Wir verwenden 4 shadcn-Komponenten (Card, Input, Label, Button), 4 Lucide-Icons und unser CSS Module.

**State:**

```jsx
const [showPassword, setShowPassword] = useState(false)    // Toggle Passwort-Sichtbarkeit
const [formData, setFormData] = useState({ email: "", password: "" })  // Formulardaten
```

**Controlled Inputs:** Jedes Input-Feld hat `value` und `onChange`. React kontrolliert den Wert:

```jsx
value={formData.email}
onChange={(e) => setFormData({ ...formData, email: e.target.value })}
```

**`{ ...formData, email: e.target.value }`**: Spread-Operator kopiert das alte Objekt und überschreibt nur das `email`-Feld. So bleiben die anderen Felder (z.B. `password`) erhalten.

**Passwort-Toggle:**

```jsx
type={showPassword ? "text" : "password"}   {/* Ternary: zeigt oder versteckt */}
onClick={() => setShowPassword(!showPassword)}  {/* ! dreht den Boolean um */}
```

**CSS Module + Design Tokens in Aktion:**
- `className={s.authCard}` → wird zu `max-w-container-sm` (448px, aus `--container-sm`)
- `className={s.inputIcon}` → wird zu `size-icon-sm` (16px, aus `--icon-sm`)
- `className="size-icon-sm"` → direkt auf dem Eye-Icon (inline Tailwind)

**`onSubmit?.(...)`**: Der `?.` (Optional Chaining) prüft, ob die Funktion existiert. So funktioniert die Komponente auch ohne übergebene `onSubmit`-Prop.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| CSS Module Import | `import s from "./auth.module.css"` | Scoped Styles als Objekt |
| Controlled Inputs | `value={formData.email}` + `onChange` | React verwaltet den Input-Wert |
| Spread-Operator | `{ ...formData, email: "new" }` | Objekt kopieren + ein Feld überschreiben |
| Design Tokens | `size-icon-sm`, `max-w-container-sm` | Globale Konfiguration aus Token-Dateien |
| shadcn Komposition | Card → CardHeader → CardContent → Form | Puzzle-Teile zusammensetzen |

---

## Schritt 15: Testen

Importiere die `LoginForm` in deine `App.jsx`:

```jsx
import { LoginForm } from "@/features/auth/LoginForm"

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm onSubmit={(data) => console.log("Login:", data)} />
    </div>
  )
}

export default App
```

Starte den Dev-Server:

```bash
npm run dev
```

### Checkliste

| Prüfe | Erwartet |
|-------|----------|
| Formular sichtbar | Zentrierte Card mit Email + Passwort |
| Icons | Mail- und Lock-Icons links in den Feldern |
| Passwort-Toggle | Klick auf Eye-Icon zeigt/versteckt Passwort |
| Design Tokens testen | Ändere `--icon-sm: 1rem` → `--icon-sm: 1.5rem` in `sizing.css` → Icons werden größer |
| Dark Mode | Ändere `<html class="dark">` in den DevTools → Farben wechseln |

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Live-Reload | `npm run dev` + Datei speichern | Vite aktualisiert den Browser sofort |
| Token-Test | Wert in `sizing.css` ändern | Beweis, dass Tokens global wirken |
| Dark Mode | `class="dark"` auf `<html>` | Farb-Tokens wechseln automatisch |

---

# Teil 6: Deine Aufgabe

---

## Aufgabe: RegisterForm bauen

Baue die `RegisterForm`-Komponente nach dem gleichen Muster wie die `LoginForm`.

### Anforderungen

1. **Datei erstellen:** `src/features/auth/RegisterForm.jsx`
2. **Felder:** Name, Email, Passwort, Passwort bestätigen
3. **Icons:** `User` (Name), `Mail` (Email), `Lock` (Passwort)
4. **Validierung:** Passwort und Bestätigung müssen übereinstimmen
5. **CSS Module:** Verwende das gleiche `auth.module.css` (alle Klassen sind wiederverwendbar!)

### Hinweise

**State:**
```jsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
})
```

**Validierung im Submit:**
```jsx
if (formData.password !== formData.confirmPassword) {
  alert("Passwords don't match")
  return
}
```

**Neues Icon importieren:**
```jsx
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
```

**Card-Header:**
```jsx
<CardTitle>Create an account</CardTitle>
<CardDescription>Sign up to start ordering delicious food</CardDescription>
```

### Tipp

Schau dir die Referenz-Implementierung im Storybook an: **Composed → RegisterForm → Source**. Dort findest du den vollständigen Code zum Vergleichen.

---

## Zusammenfassung

| Konzept | Datei | Beschreibung |
|---------|-------|-------------|
| Design Tokens | `styles/tokens/*.css` | Zentrale Werte als CSS Custom Properties |
| @theme inline | `styles/globals.css` | Tokens → Tailwind-Klassen |
| CSS Modules | `*.module.css` | Scoped Styles mit `@apply` + `@reference` |
| CVA | `lib/styles/button.js` | Varianten-Management für Komponenten |
| Theming | `theme-provider.jsx` + `colors.css` | Light/Dark via CSS-Klasse auf `<html>` |
| Tailwind | Inline im JSX | Layout-Utilities: flex, grid, spacing |

### Die 3 Ebenen auf einen Blick

```
Ebene 1:  --icon-sm: 1rem                        (tokens/sizing.css)
    ↓
Ebene 2:  --spacing-icon-sm: var(--icon-sm)       (globals.css @theme inline)
    ↓
Ebene 3:  @apply size-icon-sm                     (auth.module.css)
    ↓
Resultat: .inputIcon { width: 1rem; height: 1rem }
```

Ändere **einen Wert** in Ebene 1 → Ebenen 2 und 3 aktualisieren sich automatisch → **alle** Komponenten, die `size-icon-sm` verwenden, ändern sich.
