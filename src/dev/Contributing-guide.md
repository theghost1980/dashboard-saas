# Contributing Guide

Este proyecto es una demo técnica enfocada en buenas prácticas de frontend:
arquitectura clara, UI consistente, performance y mantenibilidad.

Aunque el repositorio es público, este documento define las reglas de trabajo
para mantener el código limpio y fácil de evolucionar.

---

## 🎯 Objetivo principal

- Cada cambio debe tener **una intención clara**
- Evitar PRs grandes y difíciles de revisar
- Priorizar claridad, consistencia y calidad sobre velocidad

---

## 🧩 Estrategia de cambios

### Regla base

> **1 cambio = 1 feature = 1 PR**

Si durante un cambio aparece otra mejora:

- ❌ No se incluye en el mismo PR
- ✅ Se anota en `TODO.md` para retomarla luego

---

## 🌱 Ramas

Usar ramas por feature o fix:

```bash
feat/user-widget-polish
fix/theme-flicker
refactor/virtualized-list
```
