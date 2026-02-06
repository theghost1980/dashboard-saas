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

- AppShell con sidebar colapsable (desktop)
- Navegación mobile con drawer (hamburger + overlay)
- Dashboard con KPIs reales + gráficos
- Customers page con:
  - búsqueda
  - sorting estable
  - virtualización
  - columnas responsivas por prioridad
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

- Gráficos encapsulados en paneles consistentes
- El fondo del chart **no depende del theme interno** de la librería
- Consistencia visual garantizada en light/dark
- Datos derivados con `useMemo` (no en render)
- Layout mobile-first:
  - KPIs apilados en mobile
  - grid como enhancement en desktop

---

## 🧠 Filosofía de trabajo

- Cambios pequeños y atómicos
- No mezclar lógica, estilos y refactors
- Identificar límites reales del browser (y respetarlos)
- Optimizar **cuando hay evidencia**, no antes
- Código legible > código “ingenioso”

---

## 🔍 Estado del proyecto

Este proyecto se considera **funcional y presentable**, con una lista clara de mejoras
**dejadas intencionalmente** para futuras iteraciones.

➡️ Ver roadmap técnico en:  
[`TODO.app.md`](src/dev/docs/TODO.app.md)

---

## 🔍 Contribuciones posibles (con reglas)

Este proyecto admite mejoras y contribuciones, siguiendo estándares similares a proyectos reales.

Guía de contribución:  
[`CONTRIBUTING.app.md`](src/dev/docs/CONTRIBUTING.app.md)

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

- Layout con CSS Grid
- Sidebar colapsable en desktop
- Drawer mobile:
  - overlay
  - cierre con ESC
  - cierre al navegar
  - lock de scroll en body
- Select nativo mantenido a propósito:
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
- Ajustes finales en widgets mobile-first
- Custom Select accesible
- Tokens de estados (`success / warn / error`)
- Stylelint
- Pulido final de scrollbars y focus states

Estas mejoras están documentadas en `TODO.app.md`.

</details>

---

## 📌 Nota final

Este proyecto está pensado como:

- **portfolio serio**
- base para entrevistas técnicas
- ejemplo de cómo crecer una app sin perder control

Si eres recruiter o engineer, el código está escrito para ser
**leído y entendido**, no solo para “funcionar”.
