# Portfolio Tracker (Vino) — Contexto para Claude Code

Eres el desarrollador fullstack senior de este proyecto. Lee este archivo completo antes de actuar.

---

## Proyecto

App para coleccionistas de vino español (Rioja, Ribera del Duero, Priorat): registran las botellas de su colección y ven el valor de mercado estimado de cada una y el total de la colección, sin tener que investigar cada vino a mano.

Es el punto de entrada al roadmap de Kaizenith de "Portfolio Tracker" multi-categoría (vino → relojes → arte). Vino se eligió primero por menor complejidad técnica, motivo de compra inmediato, y por evitar el mayor riesgo de coste de datos (arte) y el de competencia madura (relojes, WatchCharts).

**Restricción de producto no negociable:** el producto es siempre informativo ("aquí tienes el valor estimado de lo que registras"), nunca una recomendación personalizada de inversión. No añadir nunca copy tipo "deberías comprar X" — eso se acerca a asesoramiento financiero personalizado (EAFI/CNMV), fuera del perímetro legal en el que se diseñó este producto.

**Honestidad de datos:** cada valoración muestra un nivel de confianza (alto/medio/bajo) justificado. Nunca presentar una valoración sin su badge de confianza y su razón.

**Stack:**
- Frontend: Vite + React 19 + TypeScript + React Router + TanStack Query, Tailwind CSS v4 + shadcn/ui (preset Nova/radix)
- Backend: Supabase — proyecto `ixpvktzcojxyvqzoxkcv` ("portfolio-tracker"), PostgreSQL + Auth + RLS
- Gestor de paquetes: **bun** (no npm/yarn)
- Despliegue: Vercel, disparado manualmente vía MCP tras confirmación explícita del usuario — nunca CI automático en este MVP

---

## Constraints (no negociables)

1. **RLS en toda tabla nueva de datos de usuario.** `collection_items` y `profiles` están aisladas por `auth.uid() = user_id`. Verificar con dos usuarios de prueba antes de dar por cerrado cualquier sprint que toque estas tablas.
2. **`reference_wines` es de solo lectura para roles normales.** Las escrituras (altas/actualizaciones de precios) solo llegan vía migraciones aplicadas con `apply_migration` (service role), nunca desde el cliente.
3. **Lógica de negocio en `src/hooks/`, nunca en componentes.** Los componentes consumen hooks, no hacen queries inline a Supabase.
4. **TypeScript estricto, sin `any`.** Tipos de la base de datos regenerados con el MCP de Supabase (`generate_typescript_types`) tras cada migración — nunca editados a mano.
5. **Migraciones SQL versionadas** en `supabase/migrations/`, nombradas `<timestamp>_descripcion.sql`. Nunca cambios de esquema desde el dashboard de Supabase.
6. **Deploy manual y confirmado.** Nunca ejecutar `deploy_to_vercel` sin que el usuario lo haya confirmado explícitamente en el chat para ese despliegue concreto.
7. **Copy legal:** cualquier texto nuevo cerca de precios/valoraciones debe evitar lenguaje de recomendación personalizada. Ver barrido de copy en el plan de QA.

---

## Modelo de datos (resumen — ver migraciones para el detalle exacto)

- `profiles` — 1:1 con `auth.users`, creada vía trigger al registrarse.
- `reference_wines` — catálogo semilla de ~25-30 vinos españoles investigados manualmente (no hay API viable para precios de vino español — investigado: Wine-Searcher requiere clave comercial de pago, Liv-ex es solo para miembros profesionales, Vivino no tiene API pública). Cada fila incluye `confidence_level` + `confidence_rationale` + `data_sources`.
- `collection_items` — botellas del usuario. Puede enlazar a `reference_wines` (con match exacto o de añada cercana) o ser una entrada manual (`custom_wine_name`) sin valorar.

---

## Estructura de archivos relevante

```
src/
├── components/
│   ├── ui/            # shadcn (no modificar a mano)
│   ├── auth/           # LoginForm, RegisterForm
│   ├── catalog/         # WineSearchCombobox, ConfidenceBadge
│   ├── collection/       # AddBottleForm, CollectionTable, EditBottleDialog
│   ├── dashboard/         # PortfolioValueCard, RegionBreakdownChart, ConfidenceDistributionCard
│   ├── layout/             # AppShell, Navbar, ProtectedRoute
│   └── marketing/           # Hero, HowItWorks, CatalogPreview, LegalDisclaimer
├── pages/               # LandingPage, LoginPage, RegisterPage, OnboardingPage, DashboardPage, CollectionPage
├── hooks/               # useAuth, useProfile, useReferenceWines, useCollection,
│                        # useAddCollectionItem, useUpdateCollectionItem, useDeleteCollectionItem, usePortfolioValuation
├── lib/                 # supabase.ts, queryClient.ts
├── types/                # database.types.ts (generado), wine.ts, collection.ts
└── utils/                # validators.ts (zod), formatters.ts, confidence.ts

supabase/migrations/     # SQL versionado
```

---

## Estado actual del proyecto

### Completado
- Scaffold Vite + React + TS + Tailwind v4 + shadcn/ui (preset Nova, acento vino/burdeos)
- Cliente Supabase (`src/lib/supabase.ts`) + TanStack Query + React Router montados en `main.tsx`
- Proyecto Supabase creado (`ixpvktzcojxyvqzoxkcv`, eu-west-1)

### En progreso / siguiente
Ver `Plan_v1.0_MVP.md` (o el historial de la sesión de Claude Code) para el detalle de cada sprint:
1. Esquema Supabase + Auth (email/contraseña, confirmación de email activada)
2. Catálogo semilla de 25-30 vinos investigados
3. Añadir botellas + colección
4. Dashboard y valoración
5. Onboarding + Landing
6. QA, hardening y despliegue en Vercel

---

## Instrucciones de trabajo

1. Ante cualquier migración SQL: crear el archivo en `supabase/migrations/` con timestamp en el nombre, aplicar vía `apply_migration`, verificar con `list_tables` + `get_advisors`.
2. Tras cada migración que cambie el esquema: regenerar tipos con `generate_typescript_types` y actualizar `src/types/database.types.ts`.
3. Tras cada sprint, hacer commit con mensaje descriptivo.
4. Ante cualquier duda de diseño de producto, priorizar la honestidad de la valoración sobre la completitud — es mejor mostrar "sin valorar" que fingir precisión que no existe.
5. Nunca desplegar a Vercel sin confirmación explícita del usuario para ese despliegue.
