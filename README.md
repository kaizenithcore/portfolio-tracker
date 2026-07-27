# Portfolio Tracker — Vino

Registra tu colección de vino español (Rioja, Ribera del Duero, Priorat) y consulta el valor de mercado estimado de cada botella y del total de tu colección, sin investigar cada vino a mano.

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
