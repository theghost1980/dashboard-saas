Sección Resumen Diario de Actividades:

# Día + Resumen:

## Resumen de lo que hicimos hoy 30/1/26

## 🧱 Base de diseño y tokens

- Unificamos **tokens globales** (`tokens.css`, `theme.css`, `global.css`)
- Separación clara entre:
  - **tokens** (tipografía, spacing, radius)
  - **theme** (colors, surfaces, accents, shadows, scrollbar, shimmer)

- Eliminamos colores hardcodeados y variables antiguas (`--primary-text-color`, etc.)
- Mejoramos consistencia light/dark sin hacks peligrosos

---

## 🧭 AppShell

- Limpieza y alineación visual del layout general
- Mejora del **select de Origen de Datos**:
  - Estilizado con tokens (input-like)
  - Eliminado salto visual al hacer click
  - Identificado límite del `<select>` nativo en dark mode

- Se documentó correctamente como **TODO**:
  - Reemplazar `<select>` nativo por custom Select accesible

---

## 📊 Dashboard

- Layout refinado:
  - spacing tokenizado
  - grid más limpio
  - markup simplificado (menos wrappers inútiles)

- KPIs:
  - DonutCharts alineados horizontalmente
  - Mejores colores, acentos y badges
  - Mejor jerarquía visual

- Fix importante:
  - **dependencias incorrectas en `useMemo`** (bug potencial)
  - Commit separado y bien justificado

---

## 👥 Customers Page

- Refactor completo de estilos:
  - alineación con tokens
  - eliminación de CSS muerto
  - responsive real

- Mejor UX del search
- Lógica mantenida intacta (buen criterio de commits)

---

## ⚙️ Settings Page

- Convertida en **panel real** (card):
  - surface, border, shadow
  - spacing consistente
  - responsive sin porcentajes frágiles

- Fix de detalles:
  - typo en `target="_blank"`
  - simplificación de `checked`
  - mejora a11y en links

---

## 📜 Virtualized List

- Pulido visual:
  - padding en filas
  - hover sutil
  - separación clara entre borde del contenedor y filas

- Mantuvimos performance intacto

---

## ✨ Shimmer / Loading

- ShimmerOverlay refinado:
  - respeta border-radius del componente envuelto
  - animación condicional por `prefers-reduced-motion`
  - overlay limpio, no invasivo
  - mejora de accesibilidad (`aria-busy`, `aria-live`)

- Listo como solución reusable y “product-ready”

---

## 🧠 Meta (lo más importante)

- Trabajamos **por commits pequeños y con intención clara**
- Separación estricta:
  - estilos vs lógica
  - fixes vs ajustes visuales

- Identificamos límites reales del navegador y los documentamos (no hacks)

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
