# SpengerBite — CSS Architecture Reference

Referenzprojekt + Storybook fuer die CSS-Architektur von SpengerBite (Food-Delivery-App).

**Stack:** React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui + Storybook 10

## Schnellstart

```bash
npm install
npm run dev          # App starten
npm run storybook    # Storybook starten
```

## Tutorial

Siehe [TUTORIAL.md](./TUTORIAL.md) fuer eine Schritt-fuer-Schritt-Anleitung zur CSS-Architektur:

- Projekt-Setup (React + Vite + Tailwind v4 + shadcn/ui)
- Die 3 Ebenen: Design Tokens → @theme inline → CSS Modules
- CVA (Class Variance Authority)
- Theming (Light/Dark Mode)
- Tutorial: LoginForm bauen

## Projektstruktur

```
src/
├── styles/tokens/       Design Tokens (colors, typography, sizing, radius)
├── styles/globals.css   @theme inline: Tokens → Tailwind-Klassen
├── components/ui/       shadcn/ui Komponenten (Button, Input, Card, ...)
├── lib/styles/          CVA Varianten (button.js)
├── features/            Feature-Komponenten (auth, cart, checkout, ...)
└── stories/             Storybook Stories
```
