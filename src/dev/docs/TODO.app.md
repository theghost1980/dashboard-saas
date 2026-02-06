# TODO — Dashboard SaaS

Este documento define el estado real del proyecto y las tareas pendientes.
Es la **fuente de verdad** para el roadmap técnico y de UX.

---

## ✅ DONE

### AppShell / Layout

- [x] AppShell con layout base desktop
- [x] Sidebar desktop colapsable
- [x] Mobile drawer navigation (hamburger)
  - [x] Overlay
  - [x] Cierre al navegar (pathname)
  - [x] Cierre con tecla ESC
  - [x] Lock scroll del body cuando está abierto
  - [x] Cierre automático al cambiar a desktop
- [x] Mover selector de “Origen de Datos” al drawer en mobile
- [x] Ocultar selector en header mobile

### Hooks / Infraestructura

- [x] `useDimensions` mejorado
  - init correcto (sin `w=0`)
  - throttling con `requestAnimationFrame`
  - evitar renders redundantes
- [x] `useDrawer`
  - API clara: `isMobile`, `isOpen`, `open`, `close`, `toggle`
  - sin exponer setters internos
- [x] Separación clara entre:
  - hooks de comportamiento
  - layout
  - widgets

### Dashboard — Global KPIs

- [x] Refactor mobile-first (Opción A):
  - [x] Stack vertical en mobile
  - [x] Grid 3 columnas en desktop
  - [x] Donut abajo full width
  - [x] Sin legend a la derecha (evita romper mobile)
- [x] Layout consistente con surfaces y spacing

---

## 🟡 IN PROGRESS

### Customers Page

- [x] Gráfico oculto en mobile (<700px)
- [x] Sistema de columnas por prioridad (`priority`)
- [x] Cálculo de `visibleColumns` por breakpoint
- [x] `gridTemplateColumns` derivado de columnas visibles
- [ ] Renderizar headers con `visibleColumns` (no `columns`)
- [ ] Renderizar filas con `visibleColumns`
- [ ] Ajustar prioridades finales:
  - `<800px`: ocultar 1 columna
  - `<700px`: ocultar una adicional
- [ ] Si el sort apunta a una columna oculta → fallback a `name`
- [ ] Revisar `rowHeight` en mobile (tap targets)

### Widgets (User / Todo)

- [ ] Definir política mobile-first:
  - virtualización solo en desktop
  - lista normal en mobile (evitar scroll dentro de scroll)
- [ ] Ajustar densidad (`rowHeight`) en mobile
- [ ] KPIs del TodoWidget en 2x2 en mobile
- [ ] Reducir “chrome” en mobile (menos elementos antes de la lista)

---

## 🔜 TODO

### UX / Producto

- [ ] Customers table:
  - expand row en mobile (ver detalles inline)
- [ ] Empty states más expresivos
- [ ] Estados de error visibles

### Accesibilidad

- [ ] Restaurar focus al hamburger al cerrar drawer
- [ ] Revisar navegación por teclado en tablas

### Arquitectura / DX

- [ ] Centralizar breakpoints (700 / 800) en config/tokens
- [ ] Crear `useBreakpoint()` semántico
- [ ] Tests básicos de hooks (useDrawer / useDimensions)

---

## 🧹 NICE TO HAVE

- [ ] Animación de entrada/salida del drawer
- [ ] Persistir estado del sidebar desktop
- [ ] Mejorar contraste en dark mode para tablas
