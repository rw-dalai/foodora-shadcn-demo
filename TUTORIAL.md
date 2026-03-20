# SpengerBite CSS-Architektur: Tutorial

## Einleitung

Wir bauen das CSS-Fundament für **SpengerBite**, eine Food-Delivery-App (ähnlich Foodora).   
In diesem Tutorial lernst du die **CSS-Architektur** hinter einem modernen React-Projekt: von Design Tokens über Tailwind CSS bis hin zu CSS Modules und Dark Mode.

Das fertige Referenzprojekt mit **Storybook** findest du in diesem Repository.  
Dort kannst du jede Komponente inspizieren, den Source Code kopieren und live testen.

### Storybook starten

Bevor du mit dem Tutorial beginnst, starte das Storybook im Referenzprojekt. So kannst du jederzeit nachschauen, wie die fertigen Komponenten aussehen:

```bash
npm install
npm run storybook
```

Storybook öffnet sich auf `http://localhost:6006`. **Lasse es im Hintergrund laufen**, während du das Tutorial durcharbeitest.

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

### Inhaltsverzeichnis

1. **Teil 1: Projekt-Setup** - Vite, Tailwind, shadcn/ui
2. **Teil 2: Tailwind CSS** - Utility-First Grundlagen
3. **Teil 3: CSS-Architektur** - Design Tokens, @theme inline, CSS Modules
4. **Teil 4: Storybook** - Komponenten-Katalog nutzen und kopieren
5. **Teil 5: LoginForm bauen** - Alles zusammensetzen
6. **Teil 6: Deine Aufgabe** - RegisterForm selbst bauen
7. **BONUS:** Troubleshooting, CVA & Theming, API-Ausblick

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

Erstelle den Ordner und die Datei `src/styles/globals.css`:

```bash
mkdir -p src/styles
```

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

## Schritt 4: shadcn/ui einrichten

[shadcn/ui](https://ui.shadcn.com) ist eine Sammlung von fertigen, schön gestalteten React-Komponenten (Buttons, Cards, Inputs, ...). Die Komponenten werden direkt in dein Projekt kopiert. Du kannst sie jederzeit anpassen.

> **Wichtig:** shadcn ist kein npm-Paket! Die Dateien werden in `src/components/ui/` kopiert und gehören dann **dir**. Du kannst sie frei ändern. Das unterscheidet shadcn von klassischen Component Libraries wie Material UI.

### Abhängigkeiten installieren

```bash
npm install class-variance-authority clsx tailwind-merge tw-animate-css radix-ui lucide-react
```

| Paket | Zweck |
|-------|-------|
| **class-variance-authority** | CVA: Varianten-Management für Komponenten (solid, outline, ghost, ...) |
| **clsx** | Bedingte CSS-Klassen zusammenführen |
| **tailwind-merge** | Tailwind-Klassen intelligent mergen (p-4 + p-6 -> p-6) |
| **tw-animate-css** | Animationen für shadcn-Komponenten (Dialog, Sheet, ...) |
| **radix-ui** | Headless UI-Primitives (Accessibility, Keyboard-Navigation) |
| **lucide-react** | Icon-Bibliothek (Mail, Lock, Eye, User, ...) |

### shadcn-Konfiguration erstellen

shadcn bietet verschiedene Komponenten-Stile an. Wir verwenden den **new-york** Stil mit Radix UI Primitives. Erstelle die Konfigurationsdatei `components.json` im **Projekt-Root**:


```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```


### Hilfsfunktion erstellen

```bash
mkdir -p src/lib
```

Erstelle `src/lib/utils.js`:

```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

### Komponenten installieren

Jetzt kann `npx shadcn add` die Konfiguration lesen und Komponenten im richtigen Stil generieren:

```bash
npx shadcn@latest add button card input label avatar badge separator
```

Das kopiert 7 Komponenten nach `src/components/ui/`.

> **Tipp:** Wenn du später weitere Komponenten brauchst, kannst du sie jederzeit einzeln hinzufügen: `npx shadcn@latest add sheet dialog dropdown-menu`. Eine Liste aller verfügbaren Komponenten findest du auf [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).

### Was passiert hier?

**`components.json`** sagt shadcn:
- `"style": "new-york"` -> welchen Komponenten-Stil generieren (shadcn bietet auch "base-nova" an)
- `"tsx": false` -> JavaScript statt TypeScript
- `"css": "src/styles/globals.css"` -> wo die CSS-Datei liegt
- `"aliases"` -> welche Import-Pfade verwenden (`@/components/ui/button`)

**`cn()` Funktion** merged CSS-Klassen intelligent. Wenn zwei Klassen kollidieren (z.B. `p-4` und `p-6`), gewinnt die letzte:

```javascript
cn("p-4 bg-primary", "p-6")   // -> "bg-primary p-6"  (p-6 überschreibt p-4)
```

**`npx shadcn add`** liest `components.json` und generiert die Komponenten-Dateien. Die Dateien gehören danach dir, du kannst sie frei anpassen (das machen wir in Schritt 10 mit dem Button).

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| shadcn/ui | `npx shadcn add` kopiert Komponenten in `src/components/ui/` | Fertige UI-Komponenten, die du anpassen kannst |
| `components.json` | Konfiguration mit `"style": "new-york"` | Bestimmt welchen Stil die generierten Komponenten haben |
| `cn()` | `clsx` + `tailwind-merge` in einer Funktion | Merged Tailwind-Klassen intelligent (Standard + Überschreibung) |
| Lucide | `import { Mail } from "lucide-react"` | 1500+ Icons als React-Komponenten |

### Checkpoint: Setup überprüfen

Starte jetzt den Dev-Server, um sicherzustellen, dass alles funktioniert:

```bash
npm run dev
```

Öffne die angezeigte URL (normalerweise `http://localhost:5173`). Du siehst die Standard-Vite-Seite. Öffne die **Browser-Konsole** (F12 -> Console). Es sollten **keine Fehler** erscheinen.

> **Lasse den Dev-Server laufen!** Vite aktualisiert den Browser bei jeder Änderung automatisch (HMR). Ab jetzt kannst du nach jedem Schritt sofort im Browser prüfen, ob alles funktioniert.

---

# Teil 2: Tailwind CSS — Einführung

Tailwind CSS ist ein **Utility-First CSS-Framework**. Statt eigene CSS-Klassen zu schreiben, verwendet man vordefinierte Klassen direkt im JSX. Jede Klasse macht **genau eine Sache**, daher "Utility". In diesem Abschnitt lernst du die wichtigsten Tailwind-Klassen kennen, die du im gesamten Projekt brauchst.

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

**Vorteil:** Du siehst sofort im JSX, wie ein Element aussieht, ohne zwischen HTML und CSS zu springen. Bei Änderungen brauchst du nur eine Datei zu öffnen.

---

### Das Box Model in Tailwind

Jedes HTML-Element ist eine Box mit **Content**, **Padding**, **Border** und **Margin**:

```
┌─────────────────── Margin (m-*) ───────────────────┐
│  ┌────────────── Border (border-*) ─────────────┐  │
│  │  ┌────────── Padding (p-*) ───────────────┐  │  │
│  │  │                                        │  │  │
│  │  │           Content (w-*, h-*)           │  │  │
│  │  │                                        │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

**Padding** (Innenabstand):

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `p-4` | `padding: 1rem` (16px) | Alle Seiten |
| `px-4` | `padding-left/right: 1rem` | Horizontal |
| `py-2` | `padding-top/bottom: 0.5rem` | Vertikal |
| `pt-6` | `padding-top: 1.5rem` | Nur oben |

**Margin** (Außenabstand):

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `m-4` | `margin: 1rem` | Alle Seiten |
| `mx-auto` | `margin-left/right: auto` | Horizontal zentrieren |
| `mt-2` | `margin-top: 0.5rem` | Nur oben |
| `-mt-2` | `margin-top: -0.5rem` | Negativer Margin |

**Breite & Höhe:**

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `w-full` | `width: 100%` | Volle Breite |
| `w-64` | `width: 16rem` (256px) | Feste Breite |
| `h-10` | `height: 2.5rem` (40px) | Feste Höhe |
| `min-h-screen` | `min-height: 100vh` | Mindestens Bildschirmhöhe |
| `size-5` | `width: 1.25rem; height: 1.25rem` | Breite UND Höhe gleichzeitig |

**Border:**

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `border` | `border-width: 1px` | Standard-Rahmen |
| `border-2` | `border-width: 2px` | Dickerer Rahmen |
| `border-t` | `border-top-width: 1px` | Nur oben |
| `rounded-lg` | `border-radius: 0.5rem` | Abgerundete Ecken |
| `rounded-full` | `border-radius: 9999px` | Vollständig rund |

---

### Spacing-Skala

Tailwind verwendet ein konsistentes System. Die Zahl × 0.25rem = Pixel/4:

| Klasse | rem | Pixel | Verwendung |
|--------|-----|-------|-----------|
| `*-0.5` | 0.125rem | 2px | Minimaler Abstand |
| `*-1` | 0.25rem | 4px | Sehr klein |
| `*-2` | 0.5rem | 8px | Klein |
| `*-3` | 0.75rem | 12px | Mittel-klein |
| `*-4` | 1rem | 16px | Standard |
| `*-6` | 1.5rem | 24px | Mittel |
| `*-8` | 2rem | 32px | Groß |
| `*-10` | 2.5rem | 40px | Sehr groß |
| `*-12` | 3rem | 48px | Extra groß |
| `*-16` | 4rem | 64px | Maximal |

> `*` steht für den Prefix: `p-4` (Padding 16px), `m-4` (Margin 16px), `gap-4` (Gap 16px), `w-4` (Breite 16px), `h-4` (Höhe 16px).

---

### Layout: Flexbox

Flexbox ist das wichtigste Layout-Tool in Tailwind. Es arrangiert Elemente in einer **Zeile** oder **Spalte**.

```jsx
{/* Horizontal: Elemente nebeneinander */}
<div className="flex items-center gap-4">
  <img src="logo.png" className="h-8" />
  <span>Spengerbite</span>
</div>
```

```jsx
{/* Vertikal: Elemente untereinander */}
<div className="flex flex-col gap-2">
  <label>Email</label>
  <input />
</div>
```

**Die wichtigsten Flexbox-Klassen:**

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `flex` | `display: flex` | Flexbox aktivieren |
| `flex-col` | `flex-direction: column` | Vertikal stapeln |
| `items-center` | `align-items: center` | Vertikal zentrieren |
| `justify-between` | `justify-content: space-between` | Platz zwischen Elementen |
| `justify-center` | `justify-content: center` | Horizontal zentrieren |
| `gap-4` | `gap: 1rem` | Abstand zwischen Kindern |
| `flex-1` | `flex: 1 1 0%` | Verfügbaren Platz füllen |
| `flex-shrink-0` | `flex-shrink: 0` | Nicht schrumpfen |

**Praxis-Beispiel: Navigationsleiste**

```jsx
<nav className="flex items-center justify-between px-4 h-14 border-b">
  {/* Links: Logo */}
  <span className="font-bold text-lg">Spengerbite</span>

  {/* Rechts: Actions, flex-shrink-0 verhindert Schrumpfen */}
  <div className="flex items-center gap-2 flex-shrink-0">
    <button>🔍</button>
    <button>🛒</button>
  </div>
</nav>
```

**Praxis-Beispiel: Warenkorb-Zeile**

```jsx
<div className="flex items-center gap-3">
  <img src="pizza.jpg" className="h-16 w-16 rounded-lg flex-shrink-0" />
  <div className="flex-1">
    <p className="font-medium">Margherita Pizza</p>
    <p className="text-sm text-gray-500">€ 12,99</p>
  </div>
  <span className="font-bold">2×</span>
</div>
```

> `flex-1` auf dem mittleren Element sorgt dafür, dass der Name den gesamten verfügbaren Platz einnimmt. `flex-shrink-0` auf dem Bild verhindert, dass es bei engem Platz schrumpft.

---

### Layout: Grid

Grid eignet sich perfekt für **Raster-Layouts** wie Restaurant-Karten oder Menü-Listen:

```jsx
{/* 3-Spalten-Raster mit Abstand */}
<div className="grid grid-cols-3 gap-6">
  <div>Karte 1</div>
  <div>Karte 2</div>
  <div>Karte 3</div>
</div>
```

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `grid` | `display: grid` | Grid aktivieren |
| `grid-cols-2` | `grid-template-columns: repeat(2, 1fr)` | 2 gleiche Spalten |
| `grid-cols-3` | `grid-template-columns: repeat(3, 1fr)` | 3 gleiche Spalten |
| `col-span-2` | `grid-column: span 2` | Element über 2 Spalten |
| `gap-6` | `gap: 1.5rem` | Abstand zwischen Zellen |

---

### Responsive Design

Tailwind verwendet **Breakpoint-Prefixes**. Klassen ohne Prefix gelten für **alle** Bildschirmgrößen (Mobile First):

```
                    sm:          md:          lg:          xl:
                    ≥640px       ≥768px       ≥1024px      ≥1280px
├─── Mobile ────────┤──── Tablet ──┤─── Desktop ─┤──── Wide ───┤
```

**Mobile First** bedeutet: du gestaltest zuerst die **kleinste** Ansicht, dann erweiterst du mit Prefixes:

```jsx
{/* Mobile: 1 Spalte, Tablet: 2 Spalten, Desktop: 3 Spalten */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  <div>Restaurant 1</div>
  <div>Restaurant 2</div>
  <div>Restaurant 3</div>
</div>
```

```jsx
{/* Mobile: versteckt, Desktop: sichtbar */}
<input className="hidden md:block" placeholder="Suche..." />
```

```jsx
{/* Mobile: volle Breite, Desktop: halbe Breite */}
<div className="w-full md:w-1/2">...</div>
```

**Häufig verwendet:**

| Klasse | Bedeutung |
|--------|-----------|
| `md:hidden` | Ab Tablet verstecken (nur auf Mobile sichtbar) |
| `hidden md:block` | Auf Mobile verstecken (erst ab Tablet sichtbar) |
| `md:flex` | Ab Tablet als Flexbox anzeigen |
| `md:grid-cols-2` | Ab Tablet 2 Spalten |

---

### Positionierung

Für Icons in Input-Feldern, fixierte Navigation und Overlays brauchst du Positionierung:

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `relative` | `position: relative` | Referenzpunkt für absolute Kinder |
| `absolute` | `position: absolute` | Relativ zum nächsten `relative`-Elternteil |
| `fixed` | `position: fixed` | Fixiert am Viewport (z.B. Bottom-Navigation) |
| `top-0` | `top: 0` | Oben positionieren |
| `left-3` | `left: 0.75rem` | Von links positionieren |
| `z-10` | `z-index: 10` | Vor andere Elemente |
| `-translate-y-1/2` | `transform: translateY(-50%)` | Vertikal zentrieren |

**Praxis: Icon im Input-Feld**

```jsx
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
  <input className="pl-10 ..." placeholder="your@email.com" />
</div>
```

> Das `<div>` ist `relative`, das Icon `absolute`. `top-1/2 -translate-y-1/2` zentriert das Icon vertikal. `pl-10` gibt dem Input links genug Platz für das Icon.

---

### Farben & Typografie

Tailwind hat eingebaute Farben und Schriftgrößen. In unserem Projekt verwenden wir stattdessen **Design Tokens** (nächster Abschnitt), aber die Syntax ist identisch:

```jsx
{/* Tailwind-Standard-Farben */}
<p className="text-gray-500">Grauer Text</p>
<div className="bg-blue-100 border-blue-300">Blauer Hintergrund</div>

{/* Mit unseren Design Tokens (ab Teil 3) */}
<p className="text-muted-foreground">Dezenter Text</p>
<div className="bg-primary text-primary-foreground">Brand-Farbe</div>
```

**Typografie:**

| Klasse | CSS | Beschreibung |
|--------|-----|-------------|
| `text-sm` | `font-size: 0.875rem` | Klein (14px) |
| `text-base` | `font-size: 1rem` | Standard (16px) |
| `text-lg` | `font-size: 1.125rem` | Groß (18px) |
| `text-xl` | `font-size: 1.25rem` | Extra groß (20px) |
| `font-medium` | `font-weight: 500` | Mittlere Stärke |
| `font-bold` | `font-weight: 700` | Fett |
| `truncate` | Overflow ellipsis | Text abschneiden mit `...` |

---

### Interaktive Zustände

Tailwind unterstützt **State-Prefixes** für Hover, Focus und mehr:

```jsx
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors">
  Hover mich!
</button>

<input className="border focus:ring-2 focus:ring-blue-500 focus:outline-none" />

<button className="disabled:opacity-50 disabled:pointer-events-none" disabled>
  Deaktiviert
</button>
```

| Prefix | Wann aktiv |
|--------|-----------|
| `hover:` | Mauszeiger über dem Element |
| `focus:` | Element hat Fokus (Tastatur/Klick) |
| `focus-visible:` | Fokus nur bei Tastatur-Navigation |
| `active:` | Element wird geklickt |
| `disabled:` | Element ist deaktiviert |
| `dark:` | Dark Mode ist aktiv |

> `transition-colors` sorgt für eine sanfte Animation beim Hover. Ohne `transition-*` springt die Farbe sofort um.

---

### Häufige Muster

Diese Muster wirst du in der SpengerBite-App immer wieder sehen:

```jsx
{/* Vertikal + horizontal zentrieren (z.B. Login-Seite) */}
<div className="flex min-h-screen items-center justify-center">
  <div>Zentrierter Inhalt</div>
</div>

{/* Horizontal zentrieren mit maximaler Breite */}
<div className="mx-auto max-w-lg">
  Zentrierter Container
</div>

{/* Text abschneiden statt umbrechen */}
<p className="truncate">Sehr langer Text der nicht umbrechen soll...</p>

{/* Unsichtbar aber von Screenreadern gelesen */}
<span className="sr-only">Menü öffnen</span>
```

---

### Mini-Übung: Restaurant-Grid

Teste dein Wissen! Erstelle in `App.jsx` ein responsives Restaurant-Grid:

```jsx
function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Restaurants in deiner Nähe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {["Pizza Place", "Sushi Bar", "Burger Joint", "Thai Kitchen", "Pasta House", "Taco Stand"].map((name) => (
          <div key={name} className="rounded-lg border p-4 hover:shadow-md transition-shadow">
            <div className="h-32 rounded-md bg-gray-100 mb-3" />
            <h2 className="font-medium">{name}</h2>
            <p className="text-sm text-gray-500">20-30 min · € 2,99 Lieferung</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
```

Öffne `http://localhost:5173` und verändere die Fenstergröße. Beobachte, wie die Spalten sich anpassen!

> Lösche diese Übung wieder aus `App.jsx` wenn du fertig bist. Ab Schritt 6 bauen wir die richtige Architektur auf.

---

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Utility-First | Klassen direkt im JSX: `className="flex gap-4 p-6"` | Kein separates CSS nötig, schneller Workflow |
| Box Model | `p-*` (Padding), `m-*` (Margin), `border-*`, `w-*`/`h-*` | Abstände und Größen eines Elements kontrollieren |
| Flexbox | `flex`, `flex-col`, `items-center`, `justify-between`, `gap-*` | Eindimensionales Layout (Zeile oder Spalte) |
| Grid | `grid`, `grid-cols-*`, `gap-*` | Zweidimensionales Raster-Layout |
| Responsive | Breakpoint-Prefixes: `md:grid-cols-2` | Mobile First: kleine Bildschirme zuerst |
| Positionierung | `relative` + `absolute`, `fixed` | Icons in Inputs, fixierte Navigation |
| Interaktion | `hover:`, `focus:`, `disabled:`, `transition-*` | Visuelle Rückmeldung bei Benutzeraktionen |
| Spacing-Skala | Zahl × 0.25rem: `p-4` = 16px | Konsistente Abstände im ganzen Projekt |

> **Wichtig:** Tailwind ist für **Layout** (Flexbox, Grid, Spacing, Responsive, Positionierung). Für **Branding** und **Theming** (Farben, Schriftgrößen, Icon-Größen) verwenden wir **Design Tokens**. Das ist der nächste Abschnitt.

---

# Teil 3: Die 3 Ebenen unserer CSS-Architektur

Unser Projekt verwendet drei CSS-Ebenen, die aufeinander aufbauen. Zusammen bilden sie eine saubere, wartbare CSS-Architektur.

---

## Schritt 6: Überblick — Die CSS-Pyramide

```
┌─────────────────────────────────────────┐
│  Ebene 3: CSS Modules                   │  <- Scoped Component-Styles
│  auth.module.css, cart.module.css       │    @apply + @reference
├─────────────────────────────────────────┤
│  Ebene 2: Tailwind Utilities            │  <- Die Brücke
│  globals.css -> @theme inline           │    Tokens -> Tailwind-Klassen
├─────────────────────────────────────────┤
│  Ebene 1: Design Tokens                 │  <- Single Source of Truth
│  tokens/colors.css, sizing.css, ...     │    CSS Custom Properties
└─────────────────────────────────────────┘
```

### Wer macht was?

| Ebene | Zuständig für | Dateien |
|-------|--------------|---------|
| **Ebene 1: Design Tokens** | **Die Werte** — definiert alle Design-Entscheidungen zentral | `tokens/colors.css`, `typography.css`, `sizing.css` |
| **Ebene 2: @theme inline** | **Die Brücke** — macht Tokens als Tailwind-Klassen verfügbar | `globals.css` |
| **Ebene 3: CSS Modules** | **Die Zuweisung** — weist Tailwind-Klassen den Komponenten zu | `auth.module.css`, `cart.module.css` |

### Konkretes Beispiel: Alle Texte in der App größer machen

Stell dir vor, der Fließtext (14px) soll auf 16px wachsen. **Du änderst eine einzige Zeile:**

**Ebene 1** — Ändere den Wert in `tokens/typography.css`:
```css
:root {
  --text-body: 1rem;      /* vorher: 0.875rem (14px), jetzt: 1rem (16px) */
}
```

**Ebene 2** — `globals.css` hat bereits die Brücke definiert:
```css
@theme inline {
  --font-size-body: var(--text-body);   /* -> erzeugt die Tailwind-Klasse "text-body" */
}
```
Du änderst hier **nichts**. Die Klasse `text-body` zeigt automatisch auf den neuen Wert.

**Ebene 3** — Alle CSS Modules, die `text-body` verwenden, bekommen die neue Größe:
```css
/* auth.module.css */
.formLabel {
  @apply text-body;   /* war 14px, ist jetzt automatisch 16px */
}
```
Du änderst hier **nichts**. Alle Komponenten aktualisieren sich automatisch.

**Ergebnis:** 1 Zeile in `typography.css` ändern -> alle Texte in der gesamten App werden größer. Kein Suchen-und-Ersetzen, kein Code anfassen.

### Warum brauchen wir die Brücke (Ebene 2)?

Tailwind kennt deine eigenen CSS-Variablen (`--text-body`) nicht automatisch. Es weiß nicht, dass daraus eine Klasse `text-body` werden soll. `@theme inline` sagt Tailwind:

> "Erstelle die Utility-Klasse `text-body` und verknüpfe sie mit dem Wert von `--text-body`."

Ohne Ebene 2 könntest du in CSS Modules kein `@apply text-body` schreiben. Tailwind würde die Klasse nicht kennen.

### Schlüsselkonzepte

| Ebene | Was passiert | Wann änderst du hier? |
|-------|-------------|----------------------|
| Ebene 1: Tokens | Definiert Werte (`--text-body: 0.875rem`) | Wenn sich ein Design-Wert ändert (größere Schrift, andere Farbe) |
| Ebene 2: @theme | Erzeugt Tailwind-Klassen (`text-body`) | Nur wenn du einen **neuen** Token hinzufügst |
| Ebene 3: CSS Modules | Verwendet Klassen (`@apply text-body`) | Wenn du eine neue Komponente baust |

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

**Live-Test:** Ändere `--icon-sm: 1rem` auf `--icon-sm: 1.5rem` -> alle kleinen Icons in der App werden 50% größer. Ändere `--primary: 332 98% 42%` auf `--primary: 200 98% 42%` -> die Brand-Farbe wechselt von Pink zu Blau. Ändere `--text-body: 0.875rem` auf `--text-body: 1rem` -> alle Fließtexte in der App werden größer. **Ein Wert, globaler Effekt.**

### Browser DevTools: Tokens live inspizieren

Du kannst CSS Custom Properties direkt in den Browser DevTools sehen und ändern:

1. Öffne **DevTools** (F12 oder Rechtsklick -> "Untersuchen")
2. Wähle im **Elements**-Tab das `<html>`-Element
3. Im **Styles**-Panel scrolle zu `:root`. Dort siehst du alle Tokens:
   ```
   :root {
     --primary: 332 98% 42%;
     --icon-sm: 1rem;
     --control-md: 2.25rem;
     ...
   }
   ```
4. **Klicke auf einen Wert** und ändere ihn. Die gesamte UI aktualisiert sich sofort!
5. Um Dark Mode zu testen: Füge `class="dark"` zum `<html>`-Element hinzu

> **Tipp:** DevTools-Änderungen sind temporär. Beim Reload sind die Originalwerte zurück. Das ist perfekt zum Experimentieren!

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

### globals.css erweitern

Ersetze `src/styles/globals.css` komplett (die Datei aus Schritt 2 enthält bisher nur `@import "tailwindcss"`):


```css
@import "tailwindcss";
@import "tw-animate-css";   /* Animationen für shadcn-Overlays (Sheet, Dialog) */

/* ── Token-Dateien importieren ── */
@import "./tokens/colors.css";
@import "./tokens/typography.css";
@import "./tokens/sizing.css";
@import "./tokens/radius.css";

@custom-variant dark (&:is(.dark *));

/* ── Design Tokens -> Tailwind Utilities ──
   @theme inline MUSS in der Datei mit @import "tailwindcss" stehen.
   Token-Dateien oben definieren :root / .dark CSS Custom Properties.
   Dieser Block verwandelt sie in Tailwind-Klassen. */

@theme inline {
  /* Farben -> bg-primary, text-foreground, border-border, etc. */
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

  /* Border-Radius -> rounded-lg, rounded-md, rounded-sm */
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  /* Typografie -> text-heading, text-subheading, text-body, text-caption */
  --font-size-heading:    var(--text-heading);
  --font-size-subheading: var(--text-subheading);
  --font-size-body:       var(--text-body);
  --font-size-caption:    var(--text-caption);

  /* Icon-Größen -> size-icon-xs, size-icon-sm, size-icon-md, size-icon-lg */
  --spacing-icon-xs: var(--icon-xs);
  --spacing-icon-sm: var(--icon-sm);
  --spacing-icon-md: var(--icon-md);
  --spacing-icon-lg: var(--icon-lg);

  /* Control-Höhen -> h-control-sm, h-control-md, h-control-lg */
  --spacing-control-sm: var(--control-sm);
  --spacing-control-md: var(--control-md);
  --spacing-control-lg: var(--control-lg);

  /* Avatar-Größen -> size-avatar-sm, size-avatar */
  --spacing-avatar-sm: var(--avatar-sm);
  --spacing-avatar:    var(--avatar);

  /* Container-Breiten -> max-w-container-sm, max-w-container-md, max-w-container-lg */
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

**`tw-animate-css`** liefert CSS-Animationen für shadcn-Overlay-Komponenten (Sheet, Dialog). Ohne dieses Paket fehlen die Ein-/Ausblend-Animationen. Overlays würden ohne Animation erscheinen und verschwinden.

**Tailwind v4 Namespaces:** Der Variablenname in `@theme inline` bestimmt, welche Utility-Klassen erzeugt werden:

| Namespace in @theme | Erzeugte Tailwind-Klassen | Beispiel |
|---------------------|---------------------------|---------|
| `--color-*` | `bg-*`, `text-*`, `border-*` | `--color-primary` -> `bg-primary`, `text-primary` |
| `--spacing-*` | `w-*`, `h-*`, `size-*`, `p-*`, `gap-*` | `--spacing-icon-sm` -> `size-icon-sm`, `w-icon-sm` |
| `--font-size-*` | `text-*` | `--font-size-heading` -> `text-heading` |
| `--radius-*` | `rounded-*` | `--radius-lg` -> `rounded-lg` |
| `--max-width-*` | `max-w-*` | `--max-width-container-sm` -> `max-w-container-sm` |

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

**CSS Modules** sind CSS-Dateien mit der Endung `.module.css`. Der Build-Prozess macht alle Klassennamen **einzigartig** (z.B. `.form` -> `.auth_form_x7k2`). Dadurch gibt es keine Namenskollisionen zwischen Komponenten.

### Wie man ein CSS Module erstellt

> **Hinweis:** Diese Datei erstellen wir erst in **Schritt 13**. Hier nur zur Erklärung, wie CSS Modules funktionieren.

**Beispiel:** `features/auth/auth.module.css`

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
| CSS Modules | `name.module.css` -> automatisch scoped | Keine Namenskollisionen zwischen Komponenten |
| `@reference` | Erste Zeile im CSS Module | Gibt `@apply` Zugang zu Tailwind + Design-Token-Klassen |
| `@apply` | `@apply flex gap-4 bg-primary` | Tailwind-Klassen in CSS-Klassen zusammenfassen |
| Import | `import s from "./name.module.css"` | `s` enthält alle Klassen als Objekt |
| Usage | `className={s.myClass}` | Benutzt die gescoped'te CSS-Klasse |

---

# Teil 4: Storybook

Das Referenzprojekt enthält ein **Storybook** mit allen Komponenten. Dort kannst du jede Komponente live sehen und den Source Code kopieren.

```bash
npm run storybook
```

Storybook öffnet sich auf `http://localhost:6006`. Jede Komponente hat eine **Source**-Story mit dem vollständigen Code (JSX + CSS Module).

### Komponenten aus Storybook kopieren

1. Navigiere zur Komponente (z.B. *Composed -> BottomNavBar*) und klicke auf **Source**
2. Kopiere den Code und lege die Dateien in deinem Projekt an (gleiche Ordnerstruktur)
3. Installiere fehlende shadcn-Bausteine: `npx shadcn@latest add badge button`
4. Prüfe den `@reference`-Pfad in der CSS Module: er muss auf deine `globals.css` zeigen

> **Wichtig:** Dein Projekt braucht das Grundgerüst aus Teil 1 (Vite, Tailwind, `@/`-Alias, `globals.css` mit Tokens und `@theme inline`).

---

# Teil 5: LoginForm bauen

Jetzt setzen wir alles zusammen! Wir bauen die `LoginForm`-Komponente Schritt für Schritt, mit shadcn-Bausteinen (Card, Input, Label, Button), CSS Modules und Design Tokens.

> **Storybook-Tipp:** Die fertige LoginForm kannst du jederzeit im Storybook ansehen: **Composed -> LoginForm**. Unter der **Source**-Story findest du den vollständigen Code (JSX + CSS Module). Du kannst den Code als Referenz nutzen, wenn du nicht weiterkommst, oder ihn direkt kopieren und anschließend Schritt für Schritt nachvollziehen.

---

## Schritt 10: Komponente planen

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

## Schritt 11: CSS Module erstellen

```bash
mkdir -p src/features/auth
```

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

## Schritt 12: LoginForm.jsx bauen

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
- `className={s.authCard}` -> wird zu `max-w-container-sm` (448px, aus `--container-sm`)
- `className={s.inputIcon}` -> wird zu `size-icon-sm` (16px, aus `--icon-sm`)
- `className="size-icon-sm"` -> direkt auf dem Eye-Icon (inline Tailwind)

**`onSubmit?.(...)`**: Der `?.` (Optional Chaining) prüft, ob die Funktion existiert. So funktioniert die Komponente auch ohne übergebene `onSubmit`-Prop.

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| CSS Module Import | `import s from "./auth.module.css"` | Scoped Styles als Objekt |
| Controlled Inputs | `value={formData.email}` + `onChange` | React verwaltet den Input-Wert |
| Spread-Operator | `{ ...formData, email: "new" }` | Objekt kopieren + ein Feld überschreiben |
| Design Tokens | `size-icon-sm`, `max-w-container-sm` | Globale Konfiguration aus Token-Dateien |
| shadcn Komposition | Card -> CardHeader -> CardContent -> Form | Puzzle-Teile zusammensetzen |

---

## Schritt 13: Testen

Erweitere deine `App.jsx`. Füge die `LoginForm` zum bestehenden ModeToggle hinzu:

```jsx
import { LoginForm } from "@/features/auth/LoginForm"
import { ModeToggle } from "@/components/mode-toggle"

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
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
| Design Tokens testen | Ändere `--icon-sm: 1rem` -> `--icon-sm: 1.5rem` in `sizing.css` -> Icons werden größer |
| Dark Mode | Ändere `<html class="dark">` in den DevTools -> Farben wechseln |

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

Schau dir die Referenz-Implementierung im Storybook an: **Composed -> RegisterForm -> Source**. Dort findest du den vollständigen Code zum Vergleichen.

---

## Zusammenfassung

| Konzept | Datei | Beschreibung |
|---------|-------|-------------|
| Design Tokens | `styles/tokens/*.css` | Zentrale Werte als CSS Custom Properties |
| @theme inline | `styles/globals.css` | Tokens -> Tailwind-Klassen |
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

Ändere **einen Wert** in Ebene 1 -> Ebenen 2 und 3 aktualisieren sich automatisch -> **alle** Komponenten, die `size-icon-sm` verwenden, ändern sich.

---

# BONUS: Häufige Fehler & Troubleshooting

### "Unknown at rule @reference"

**VS Code** zeigt eine Warnung, weil es `@reference` nicht kennt. Das ist ein **Tailwind CSS v4 Feature**.

**Lösung:** Installiere die **Tailwind CSS IntelliSense** Extension in VS Code. Die Warnung verschwindet und du bekommst Autocomplete für Tailwind-Klassen.

### "Unknown utility class" in CSS Modules

```css
/* ❌ Fehler: Tailwind kennt die Klassen nicht */
.myClass {
  @apply bg-primary text-foreground;
}
```

**Ursache:** Die `@reference`-Zeile fehlt am Anfang der CSS Module Datei.

**Lösung:** Füge als **erste Zeile** hinzu:

```css
@reference "../../styles/globals.css";
```

Der Pfad muss relativ zur CSS-Datei auf `globals.css` zeigen.

### Import-Pfade funktionieren nicht (`@/...`)

```
Module not found: Can't resolve '@/components/ui/button'
```

**Ursache:** Der `@/`-Alias ist nicht konfiguriert.

**Lösung:** Prüfe zwei Dateien:

1. `vite.config.js`: muss `resolve.alias` mit `"@"` enthalten
2. `jsconfig.json`: muss `paths` mit `"@/*"` enthalten

Beide müssen auf `./src` bzw. `src/*` zeigen.

### Styles werden nicht angewendet

**Ursache:** `globals.css` wird nicht importiert.

**Lösung:** Prüfe `src/main.jsx`:

```jsx
import "@/styles/globals.css"  // <- Muss vorhanden sein!
```

### Dark Mode funktioniert nicht

**Mögliche Ursachen:**

1. **ThemeProvider fehlt**: prüfe, ob `main.jsx` die App in `<ThemeProvider>` wrappen
2. **`@custom-variant` fehlt**: prüfe, ob `globals.css` diese Zeile enthält:
   ```css
   @custom-variant dark (&:is(.dark *));
   ```
3. **Dark-Tokens fehlen**: prüfe, ob `colors.css` einen `.dark { }` Block hat

### Komponente rendert nicht

**Checkliste:**
- [ ] Dateiname korrekt? (`.jsx` nicht `.js` für JSX-Dateien)
- [ ] Export vorhanden? (`export function MyComponent`)
- [ ] Import korrekt? (`import { MyComponent } from "@/features/..."`)
- [ ] In JSX verwendet? (`<MyComponent />` nicht `MyComponent()`)

---

# BONUS: CVA & Theming

Dieser Teil ist optional. CVA und Theming stecken bereits in den shadcn-Komponenten. Du kannst sie nutzen, ohne die Details zu kennen. Lies diesen Abschnitt, wenn du verstehen willst, wie Button-Varianten und Dark Mode unter der Haube funktionieren.

---

## CVA (Class Variance Authority)

**CVA** ist eine Funktion, die CSS-Klassen basierend auf `variant`- und `size`-Props generiert. Statt lange `if/else`-Ketten zu schreiben, definierst du Varianten deklarativ.

### lib/styles/button.js

```bash
mkdir -p src/lib/styles
```

Erstelle `src/lib/styles/button.js`:

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
  base,           <- Klassen, die IMMER gelten
  {
    variants: {    <- Varianten-Definitionen
      variant: {   <- Prop-Name
        solid: "", <- Wert -> Klassen
        ghost: "",
      },
      size: {      <- Zweiter Prop-Name
        sm: "",
        md: "",
      },
    },
    defaultVariants: {  <- Standard wenn kein Prop übergeben
      variant: "solid",
      size: "md",
    },
  }
)
```

**Button-Komponente anpassen:** Die von shadcn generierte `button.jsx` verwendet eigene inline-Varianten. Wir ersetzen sie, damit sie unsere externe CVA-Konfiguration aus `lib/styles/button.js` verwendet.

> **Hinweis:** Die shadcn-Standardvariante heißt `default`, wir benennen sie in `solid` um. Das ist beschreibender und vermeidet Verwechslung mit dem JavaScript-Konzept "default". Wenn du in der shadcn-Dokumentation `variant="default"` siehst, verwende stattdessen `variant="solid"`.

**Ersetze `src/components/ui/button.jsx` komplett:**

```jsx
import * as React from "react"
import { Slot } from "radix-ui"
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
Button.displayName = "Button"

export { Button, buttonVariants }
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

## Theming — Light & Dark Mode

Unser Theme-System basiert auf einer einfachen Idee: Die CSS-Klasse `dark` auf dem `<html>`-Element steuert, welche Farben gelten.

### Wie es funktioniert

```
<html>           ->  :root { --primary: 332 98% 42% }    <- Light Mode (Pink)
<html class="dark"> ->  .dark { --primary: 332 90% 55% }  <- Dark Mode (helleres Pink)
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

**Ersetze `src/main.jsx` komplett:**

```jsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/theme-provider"
import App from "./App"
import "@/styles/globals.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="spengerbite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)
```

**Aufräumen:** Lösche die nicht mehr benötigten Vite-Template-Dateien:

```bash
rm -f src/index.css src/App.css src/assets/react.svg src/assets/hero.png
```

**In `globals.css`** aktiviert diese Zeile den `dark:` Prefix für Tailwind:

```css
@custom-variant dark (&:is(.dark *));
```

### ModeToggle: Theme umschalten

Der ThemeProvider verwaltet den Zustand, aber wir brauchen noch ein UI-Element, mit dem der Benutzer zwischen Light, Dark und System wählen kann. Dafür bauen wir einen **ModeToggle** mit einem Dropdown-Menü.

**Zusätzliche shadcn-Komponente installieren:**

```bash
npx shadcn@latest add dropdown-menu
```

Erstelle `src/components/mode-toggle.jsx`:

```jsx
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Was passiert hier?

- **`useTheme()`** greift auf den ThemeProvider-Context zu und ruft `setTheme()` auf
- **`DropdownMenuTrigger asChild`**: das `asChild`-Pattern! Der Button wird als Trigger verwendet
- **Sun/Moon Icons**: CSS-Transitionen (`rotate`, `scale`) sorgen für einen eleganten Wechsel zwischen den Icons. Im Light Mode ist Sun sichtbar, im Dark Mode Moon
- **`sr-only`**: der Text "Toggle theme" ist visuell versteckt, aber von Screenreadern lesbar (Accessibility)

**Zum Testen** füge den ModeToggle in deine `App.jsx` ein:

```jsx
import { ModeToggle } from "@/components/mode-toggle"

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <h1 className="text-2xl font-bold">SpengerBite</h1>
    </div>
  )
}

export default App
```

Klicke auf das Sonnen-/Mond-Icon oben rechts. Der Hintergrund und Text wechseln zwischen Light und Dark Mode!

### Schlüsselkonzepte

| Was | Wie | Warum |
|-----|-----|-------|
| Dark Mode | `.dark`-Klasse auf `<html>` | CSS-Variablen in `.dark {}` überschreiben die Light-Werte |
| ThemeProvider | React Context + localStorage | Theme-Zustand global verfügbar + über Neustarts gespeichert |
| `useTheme()` | Custom Hook: `const { theme, setTheme } = useTheme()` | Theme von überall lesen und ändern |
| ModeToggle | DropdownMenu + Sun/Moon Icons | UI-Komponente zum Theme-Wechsel |
| System-Erkennung | `prefers-color-scheme` Media Query | Betriebssystem-Einstellung automatisch übernehmen |
| `@custom-variant` | `dark (&:is(.dark *))` | Tailwinds `dark:` Prefix funktioniert mit unserer CSS-Klasse |

---

# BONUS: Ausblick — Vom Frontend zum Full-Stack

Das CSS-Fundament steht. Deine Komponenten sehen gut aus, sind responsive und unterstützen Dark Mode. Im nächsten Schritt kommt die **Anbindung ans Backend**: echte Daten statt statischer Props.

Dafür brauchen wir einen **API Client**, eine Schicht, die HTTP-Requests ans Backend sendet. Wir schauen uns zuerst `fetch` (eingebaut) an und dann `axios` (weniger Code, mehr Komfort).

---

## Erweiterte Ordnerstruktur

```
src/
├── styles/                        <- CSS-Architektur (haben wir!)
├── components/ui/                 <- shadcn Komponenten (haben wir!)
├── lib/
│   ├── utils.js                   <- cn() Hilfsfunktion (haben wir!)
│   ├── styles/
│   │   └── button.js              <- CVA Varianten (haben wir!)
│   └── api.js                     <- NEU: Zentrale API-Konfiguration
└── features/
    ├── auth/
    │   ├── LoginForm.jsx          <- Komponente (haben wir!)
    │   ├── auth.module.css        <- Styles (haben wir!)
    │   └── auth-api.js            <- NEU: API-Calls (login, register)
    └── cart/
        ├── CartPanel.jsx          <- Komponente (haben wir!)
        ├── cart.module.css        <- Styles (haben wir!)
        └── cart-api.js            <- NEU: API-Calls (getCart, addItem)
```

### Colocation-Prinzip

API-Calls leben **beim Feature**, nicht in einem globalen `/api`-Ordner. So findest du alles, was zu `auth` gehört, an einem Ort: Komponente, Styles und API-Calls.

---

## API Client: Vorher (fetch) vs. Nachher (axios)

### Vorher: Mit `fetch` (eingebaut, kein npm-Paket nötig)

```javascript
// src/features/auth/auth-api.js — mit fetch
const API_BASE = "http://localhost:5000/api"

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || `Fehler: ${res.status}`)
  }

  return res.json()  // <- Manuell parsen!
}
```

**Nachteile von fetch:**
- `res.ok` muss manuell geprüft werden. fetch wirft bei 404/500 **keinen** Error
- `res.json()` muss manuell aufgerufen werden
- Auth-Header muss bei **jedem** Request manuell gesetzt werden
- Base-URL muss überall wiederholt werden

### Nachher: Mit `axios` (1 npm-Paket, viel weniger Code)

```bash
npm install axios
```


```javascript
// src/lib/api.js — zentrale axios-Instanz
import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
})

// Interceptor: Auth-Header automatisch bei jedem Request setzen
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```


```javascript
// src/features/auth/auth-api.js — mit axios
import { api } from "@/lib/api"

export async function loginUser(email, password) {
  const { data } = await api.post("/auth/login", { email, password })
  return data
}
//  ^ 2 Zeilen statt 10!
//  - JSON wird automatisch gesendet und geparst
//  - Auth-Header wird automatisch gesetzt (Interceptor)
//  - Bei 4xx/5xx wird automatisch ein Error geworfen
```

### Vergleich

| | `fetch` | `axios` |
|--|---------|---------|
| Eingebaut | Ja (kein Install) | Nein (`npm install axios`) |
| JSON parsen | Manuell (`res.json()`) | Automatisch (`data`) |
| Error bei 4xx/5xx | Nein (manuell prüfen) | Ja (automatisch) |
| Base-URL | Jedes Mal wiederholen | Einmal in `axios.create()` |
| Auth-Header | Jedes Mal setzen | Einmal im Interceptor |
| Request-Body | `JSON.stringify()` nötig | Objekt direkt übergeben |

> **Empfehlung:** Starte mit `fetch`, um zu verstehen was passiert. Wechsle zu `axios`, sobald du mehrere API-Calls hast. Der Interceptor für den Auth-Header spart viel Wiederholung.

---

## Beispiel: Login mit API in der Komponente


```jsx
// In LoginForm.jsx verwenden:
import { useState } from "react"
import { loginUser } from "./auth-api"

function LoginForm() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await loginUser(email, password)
      localStorage.setItem("token", data.token)
      // Weiterleitung zur Startseite, z.B. mit React Router
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... bestehende Inputs ... */}
      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Sign in"}
      </Button>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </form>
  )
}
```


---

## Zusammenfassung: Die Schichten

```
┌─────────────────────────────────────────┐
│  UI-Komponenten (React + shadcn/ui)     │  <- Was der User sieht
├─────────────────────────────────────────┤
│  CSS-Architektur (Tokens + Tailwind)    │  <- Dieses Tutorial
├─────────────────────────────────────────┤
│  API Client (fetch -> axios)            │  <- HTTP-Requests
├─────────────────────────────────────────┤
│  Backend (ASP.NET / Express / ...)      │  <- Dein HTL-Projekt
└─────────────────────────────────────────┘
```

| Schicht | Verantwortung | Wo im Code |
|---------|--------------|------------|
| UI | Darstellung, Events, Formulare | `features/*/Component.jsx` |
| CSS | Tokens, Utilities, Scoped Styles | `styles/`, `*.module.css` |
| API | HTTP-Calls, Auth-Header | `lib/api.js`, `features/*-api.js` |
