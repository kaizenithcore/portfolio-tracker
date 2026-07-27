# Acervo — Vino

Registra tu colección de vino español (Rioja, Ribera del Duero, Priorat) y consulta el valor de mercado estimado de cada botella y del total de tu colección, sin investigar cada vino a mano.

Acervo es la marca paraguas; vino es su primera vertical. Ver [docs/DESIGN.md](./docs/DESIGN.md) para la guía de identidad de marca y sistema de diseño.

Este producto es puramente informativo: muestra valor estimado de mercado, no es asesoramiento de inversión ni recomendación personalizada.

## Stack

Vite + React + TypeScript + React Router + TanStack Query · Tailwind CSS v4 + shadcn/ui · Supabase (Postgres + Auth, RLS) · Vercel

## Desarrollo local

```bash
bun install
cp .env.example .env   # rellenar con las credenciales del proyecto Supabase
bun run dev
```

Ver [CLAUDE.md](./CLAUDE.md) para el contexto completo de arquitectura y convenciones del proyecto.
