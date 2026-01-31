Sección Resumen Diario de Actividades:

# Día + Resumen:

## Resumen de lo que hicimos hoy

- **Theming “pro” con CSS variables**
  - Pasaste a **`html[data-theme="dark"]`** y dejaste `:root` como defaults.
  - Evitaste el **flicker** al recargar con un **script en `<head>`** que setea el theme antes del primer paint.
  - Dejamos `html/body` consumiendo tokens (`--bg-1`, `--text-1`) y el tema solo **redefine variables**.

- **Sistema de tokens (design tokens)**
  - Definimos tokens por rol: `bg/surface/text/border/shadow/accent/input/badge`.
  - Agregaste (o estás agregando) tokens para **shimmer** y **scrollbar** (thumb/track + hover).

- **UserWidget “premium”**
  - Tokenizaste el CSS del widget (card, badge, input, button) + fallback para `color-mix()`.
  - Mejoraste filas: padding/hover, separación de **Nombre vs ID** y avatar consistente.

- **VirtualizedList**
  - Corregiste bug del `--totalH` con `}` extra.
  - Tokenizaste bordes/background para consistencia con dark mode.
  - Dejaste el row más “layout-only” (sin tipografías/paddings hardcodeados) para que el item controle su look.

- **ShimmerOverlay**
  - Lo hiciste theme-friendly con tokens (`--shimmer-overlay`, `--shimmer-highlight`, `--shimmer-text`) + gradiente limpio.

- **StatusBar**
  - Lo llevaste a un estilo consistente con tokens + loader más moderno + accesibilidad.
  - Implementaste `lastUpdated` y corregiste el bug de “minutos negativos” (resta al revés).
  - Usaste opción A para “hace X minutos” con un tick (cada 60s).

---

## TODO.md: puntos que faltan (para retomar fácil)

### UI / Visual “wow”

- [ ] Unificar **espaciado global** entre widgets (grid/layout, gaps consistentes).
- [ ] Revisar **tabla de Customers**: tokens, hover, zebra/selected, header sticky (si aplica).
- [ ] Mejorar **consistencia de botones/inputs** en toda la app (considerar crear `shared/ui/Button` y `shared/ui/Input`).
- [ ] Ajustar `--surface-2/3` para que hover/selected se noten (light/dark).
- [ ] Definir tokens para **estados**: `success/warn/error` (y aplicarlos a StatusBar).
- [ ] Scrollbars: aplicar tokens también a `::-webkit-scrollbar` (Chrome/Safari).

### UX / Accesibilidad

- [ ] Revisar focus states (inputs/botones) en todas las vistas.
- [ ] Añadir placeholders consistentes + labels correctos donde falten.
- [ ] Revisar contraste (WCAG) para text-2/text-3 en dark mode.

### Performance / Code quality

- [ ] Revisar `VirtualizedList`:
  - [ ] handler de scroll estable (opcional)
  - [ ] confirmar `itemHeight` correcto vs padding real del item

- [ ] Normalizar nombres: `getKey={(u) => u.id}` (evitar nombre “filteredUsers” como parámetro).
- [ ] Extraer util de “time ago” a un helper reutilizable (si no lo hiciste ya).

### Funcionalidades / mejoras visuales

- Mover nombre widget-badge a status bar.
- - [ ] Replace native `<select>` in AppShell with a custom Select component
  - Reason: native select dropdown does not fully respect dark theme styling and causes visual flicker when opening (browser/OS-controlled UI).
  - Goal: achieve consistent styling, no color flash, and full control over hover/active states.
  - Notes: implement as an accessible custom select (button + listbox / ARIA) or use a headless UI approach.

### DX / Mantenimiento

- [ ] Añadir **Stylelint** para detectar variables CSS huérfanas y consistencia.
- [ ] Documentar en README: theming + script anti-flicker (decisión técnica).
