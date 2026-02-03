# 🚀 Dashboard SaaS — Frontend Architecture & UI Systems

Este proyecto es un **dashboard SaaS moderno**, construido como ejercicio profesional para demostrar:

- arquitectura frontend limpia y escalable
- diseño consistente basado en tokens y themes
- decisiones técnicas conscientes (sin hacks)
- foco en UX real y mantenibilidad
- optimización progresiva (no premature optimization)

No es una demo visual: es una **aplicación pensada como producto**.

---

## 🧱 Stack principal

- **React + TypeScript**
- **Vite**
- **CSS Modules**
- **ChartKit** (charts con dependencias mínimas)
- **React Router**
- **Virtualized Lists (handcrafted)**

Sin librerías de UI pesadas.
La intención es **entender y controlar** cada capa.

---

## ✨ Features principales

- AppShell con sidebar colapsable
- Dashboard con KPIs reales + gráficos
- Customers page con:
  - búsqueda
  - sorting
  - virtualización
  - gráficos derivados del estado

- Settings page como panel real (no formulario plano)
- Light / Dark mode consistente
- Loading states con shimmer accesible
- Tokens y themes desacoplados del layout

---

## 🎨 Sistema de diseño

- **Tokens CSS** (`spacing`, `radius`, `fonts`, `sizes`)
- **Themes** (`light` / `dark`) usando `data-theme`
- Sin colores hardcodeados en componentes
- Superficies (`surface-1`, `surface-2`, etc.) bien definidas
- Shadows, borders y focus states unificados

---

## 📊 Charts

- Gráficos encapsulados en `chartPanel`
- El fondo del chart **no depende del theme interno** de la librería
- Consistencia visual garantizada en light/dark
- Datos derivados con `useMemo` (no en render)

---

## 🧠 Filosofía de trabajo

- Cambios pequeños y atómicos
- No mezclar lógica, estilos y refactors
- Identificar límites reales del browser (y respetarlos)
- Optimizar **cuando hay evidencia**, no antes
- Código legible > código “ingenioso”

---

## 🔍 Estado del proyecto

Este proyecto se considera **funcional y presentable**, con una lista clara de mejoras **dejadas intencionalmente** para futuras Iteraciones pendientes (ver [TODO.md](src/dev/TODO.md))

---

## 🔍 Contribuciones posibles pero con reglas

Este proyecto también admite mejoras que como usuarios y programadores puedan hacerse, pero para cumplir con estándares de proyectos reales, tenemos una:
Guía de contribución (ver [CONTRIBUTING.md](src/dev/Contributing-guide.md))

---

<details>
  <summary><strong>🔧 Technical details (architecture & decisions)</strong></summary>

### 📁 Estructura y separación de responsabilidades

- **Pages**
  Orquestan datos + layout, sin lógica de bajo nivel.

- **Features / Widgets**
  Componentes con responsabilidad clara (KPIs, Users, Todos).

- **Shared / UI (handcrafted)**
  Componentes reutilizables creados a mano:
  - VirtualizedList
  - ShimmerOverlay
  - StatusBar
  - Switch
  - Tables (simple / virtualized)

---

### ⚙️ Data derivation & performance

- Datos derivados con `useMemo`
- Early returns cuando `status !== success`
- Sorting optimizado:
  - comparador único
  - dirección (`asc / desc`) numérica
  - **stable sort** para UX consistente

- Callbacks críticos memoizados (`useCallback`)
- Debounce controlado para búsquedas

---

### 🧩 Sorting estable (por qué importa)

El sorting en Customers es **estable**:
si dos filas empatan en el valor de ordenación, mantienen su orden relativo original.

Esto evita “saltos” visuales y mejora la percepción de calidad del producto.

---

### 🎛️ AppShell & decisiones técnicas

- Sidebar colapsable usando CSS Grid
- No hacks visuales para el `<select>` nativo en dark mode
  → decisión consciente de **reemplazarlo en el futuro** por un custom select accesible
- Accesibilidad considerada:
  - skip links
  - focus-visible
  - prefers-reduced-motion

---

### ♿ Accesibilidad

- Shimmer respeta `prefers-reduced-motion`
- Focus rings visibles
- Inputs y botones con estados claros
- Contraste revisado para light/dark

---

### 🧹 CSS hygiene

- Limpieza de clases huérfanas
- CSS Modules estrictos
- Tokens centralizados
- Sin estilos globales “accidentales”

---

### 🚧 Mejoras pendientes (intencionales)

- Estados completos en Customers (error / empty)
- Custom Select accesible
- Tokens de estados (`success / warn / error`)
- Stylelint
- Pulido final de scrollbars y focus states

Estas mejoras están documentadas en `TODO.md`.

</details>

---

## 📌 Nota final

Este proyecto está pensado como:

- **portfolio serio**
- base para entrevistas técnicas
- ejemplo de cómo crecer una app sin perder control

Si eres recruiter o engineer, el código está escrito para ser **leído y entendido**, no solo para “funcionar”.
