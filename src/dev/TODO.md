# TODO — Dashboard SaaS

Este archivo contiene mejoras pendientes **intencionales** para futuras iteraciones.
En este proyecto se prioriza profundidad: se implementan features y luego se deja
una fase clara de optimización / hardening.

---

## UI / Visual polish

- [ ] Unificar espaciado global entre widgets (grid/layout, gaps consistentes).
- [ ] Revisar tabla de Customers:
  - [ ] hover/selected consistente (tokens)
  - [ ] zebra rows opcional
  - [ ] header sticky (si aplica)
- [ ] Mejorar consistencia de botones/inputs en toda la app:
  - [ ] considerar `shared/ui/Button`
  - [ ] considerar `shared/ui/Input`
- [ ] Ajustar `--surface-2/3` para que hover/selected se note (light/dark).
- [ ] Definir tokens para estados: `success / warn / error` y aplicarlos a StatusBar.
- [ ] Scrollbars: aplicar tokens también a `::-webkit-scrollbar` (Chrome/Safari).

---

## Customers Page — UX “producto real”

- [ ] Añadir estados completos:
  - [ ] Loading state (shimmer/placeholder consistente)
  - [ ] Error state (mensaje + botón “Reintentar”)
  - [ ] Empty state (0 resultados + acción “limpiar búsqueda”)
- [ ] Unificar estilo de charts usando `chartPanel`:
  - [ ] envolver el donut y futuros charts en un panel con `surface-1`, padding, radius, shadow
  - [ ] evitar depender del fondo interno del theme de ChartKit
- [ ] Añadir un segundo gráfico (opcional):
  - [ ] Top ciudades (donut) + distribución por actividad (bar/donut)
- [ ] Confirmar consistencia de charts en light/dark con el mismo wrapper.

---

## Performance / Code quality

- [ ] Customers sort:
  - [ ] usar `useCallback` para `handleSetSort` con `setSort(prev => ...)`
  - [ ] simplificar sort con un único comparador (string/number)
  - [ ] (opcional) stable sort para orden determinístico en empates
- [ ] Customers memos:
  - [ ] asegurar dependencias correctas en `useMemo` (status/dataSource/data)
  - [ ] evitar trabajo cuando no hay data lista (`status !== 'success'` → return [])
- [ ] VirtualizedList:
  - [ ] confirmar `itemHeight` vs padding real del item
  - [ ] (opcional) scroll handler estable si se necesita
- [ ] Normalizar nombres de callbacks:
  - [ ] `getKey={(u) => u.id}` (evitar nombres tipo “filteredUsers” como parámetro)
- [ ] Extraer util “time ago” a helper reutilizable (si aplica en más de un sitio).

---

## Accesibilidad

- [ ] Revisar focus states (inputs/botones) en todas las vistas.
- [ ] Añadir placeholders consistentes + labels correctos donde falten.
- [ ] Revisar contraste (WCAG) para text-2/text-3 en dark mode.
- [ ] Confirmar que shimmer respete `prefers-reduced-motion` (ya aplicado) y extenderlo si hace falta.

---

## AppShell / Select (decisión técnica importante)

- [ ] Reemplazar `<select>` nativo por un custom Select accesible.
  - Razón: el dropdown nativo no respeta completamente dark theme y causa flicker
  - Goal: control total de estilos y estados hover/active sin flashes
  - Nota: implementar accesible (button + listbox / ARIA) o enfoque headless

---

## DX / Mantenimiento

- [ ] Añadir Stylelint para detectar variables CSS huérfanas y consistencia.

- [ ] Documentar en README: theming + decisiones técnicas (p.ej. no hacks al select).
