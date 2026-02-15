# Diseño UI — Guía y specs (Importar a Figma)

Este documento describe la paleta, tokens, componentes y cómo importar los wireframes/mocks SVG incluidos en `frontend/src/assets/figma/` a Figma.

## Paleta (tokens)
- --color-bg: #0F1724 (fondo primario)
- --color-surface: #0B1220 (superficies / cards)
- --color-on-surface: #E6EEF8 (texto principal)
- --color-accent: #4F46E5 (acción / primary)
- --color-success: #16A34A
- --color-warning: #F59E0B
- --color-error: #EF4444
- --muted: #98A0B3

## Tipografía
- Familia: Inter, system-ui, Arial
- Escala: 16px base
  - h1: 28-32px
  - h2: 20px
  - body: 16px
  - small: 13px

## Espaciado y tokens
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48
- Border radius: 6px (micro), 8px (cards)
- Elevación: subtle shadow 0 6px 18px rgba(2,6,23,0.08)

## Animaciones (especificaciones)
- mount / fade-in: name `fade-in`, duration 280ms, easing `cubic-bezier(.2,.8,.2,1)`
- spinner: continuous 0.8s linear
- button press: `btn-press` transform scale/translate 120ms
- keydown feedback (input/button): 120ms temporary transform

## Componentes básicos
- Button primary: background `--color-accent`, color `white`, border-radius 6px, hover transform -2px
- Card: background `--color-surface`, padding 16px, border-radius 8px
- Form input: transparent background, border 1px solid rgba(0,0,0,0.08)

## Pantallas (wireframe + mockup SVG en `frontend/src/assets/figma/`)
- Login — `login-wireframe.svg`, `login-mockup.svg`
- Register — `register-wireframe.svg`, `register-mockup.svg`
- Dashboard general — `dashboard-wireframe.svg`, `dashboard-mockup.svg`
- Formulario (Solicitud / Compra / Ticket) — `request-wireframe.svg`, `request-mockup.svg`
- Panel de Administrador (users/roles) — `admin-wireframe.svg`, `admin-mockup.svg`
- Panel de Reportes (export PDF) — `reports-wireframe.svg`, `reports-mockup.svg`

## Instrucciones para Figma
1. Abre Figma → File → Import → selecciona los SVG desde `frontend/src/assets/figma/`.
2. Cada SVG ya contiene una composición de layout (header, card, form). Puedes convertir elementos en componentes.
3. Usa la paleta del documento (`DESIGN.md`) para crear un Color Style y un Text Style.

## Accesibilidad
- Contraste alto para texto principal.
- Inputs con label vinculados.
- Foco visible en botones e inputs.

---
> Nota: puedes arrastrar estos SVG directamente a Figma para obtener los layouts de wireframe y mockup. Los archivos contienen layers y texto para edición rápida.
