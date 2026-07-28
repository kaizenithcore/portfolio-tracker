# Acervo (Vino) — Contexto para Claude Code

Eres el desarrollador fullstack senior de este proyecto. Lee este archivo completo antes de actuar.

---

## Proyecto

**Acervo** es la marca paraguas (antes "Portfolio Tracker" — renombrada, ver `docs/DESIGN.md` §0 para el porqué). App para coleccionistas de vino español (Rioja, Ribera del Duero, Priorat): registran las botellas de su colección y ven el valor de mercado estimado de cada una y el total de la colección, sin tener que investigar cada vino a mano. Vino es la primera vertical de Acervo, insinuada de forma sutil (badge "Vino" junto al wordmark), no anunciada como roadmap explícito a los usuarios.

Vino se eligió primero por menor complejidad técnica, motivo de compra inmediato, y por evitar el mayor riesgo de coste de datos (arte) y el de competencia madura (relojes, WatchCharts).

**Identidad visual:** ver `docs/DESIGN.md` — es la referencia obligatoria para cualquier trabajo de UI/diseño en este proyecto (tokens de color, tipografía, componentes, Do's/Don'ts). Resumen rápido: un único registro oscuro (**Void**, negro puro) en toda la app, sin partición marca/app; tres pasos de superficie (Void→Obsidian→Graphite) y de tinta (Ash→Frost→Paper); un único acento cromático (**Garnet**); sans Geist + mono JetBrains Mono, sin serif. Landing construida con el patrón "Feature Section" (kicker + titular + foto real + sub-características), imágenes/vídeo de stock reales en `public/media/` (Pexels, licencia libre, auto-alojados).

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

## Modelo de ingresos (decidido — no implementado todavía)

Benchmark verificado (julio 2026): CellarTracker (el competidor más comparable — registro + valoración, no gestión de activos) cobra $40/año (100 botellas) a $500/año (2.500+), freemium por tamaño de colección. Wine-Searcher PRO $10,99/mes (herramienta de trade). WatchCharts $160-$800/año (más caro, audiencia más profesional). Vinovest cobra 1,9-2,85% anual sobre activos gestionados — no comparable, es custodia de patrimonio, no SaaS informativo.

**Estructura decidida:**
- **Acervo Gratis**: hasta 15 botellas registradas, catálogo completo, dashboard básico, badges de confianza. Sin límite de tiempo.
- **Acervo Plus** — €4,99/mes o €39/año: colección ilimitada, informe PDF exportable (seguro/herencia), alertas de ventana de consumo (cuando exista), acceso prioritario a futuras verticales.
- **Add-on de pago único**: informe PDF de una botella/colección puntual, €2,99, sin necesidad de suscripción.
- **Oferta de fundador**: precio congelado (~€29/año) para los 10-15 coleccionistas de la fase de validación, a cambio de feedback.
- **Modelo de cobro**: suscripción recurrente, no licencia de pago único — el catálogo y los datos de mercado se actualizan continuamente, es un servicio vivo.

**Estado de implementación: ninguno todavía, y así debe seguir por ahora.** Decisión explícita del usuario: seguir 100% gratis (sin muro de pago, sin Stripe) hasta validar retención real con los primeros coleccionistas — cobrar demasiado pronto contaminaría esa señal. No implementar el límite de 15 botellas, Stripe, ni ningún gate de pago sin que el usuario lo pida explícitamente. Estos planes están documentados aquí como referencia de diseño de producto (p. ej. al decidir qué funciones nuevas son candidatas naturales a "Plus"), no como tarea pendiente de sprint.

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

### Completado (MVP funcional, sprints 0-6)
- Scaffold Vite + React + TS + Tailwind v4 + shadcn/ui (preset Nova, acento vino/burdeos)
- Esquema Supabase completo + RLS verificado (aislamiento por usuario probado con simulación de dos usuarios, antes y después de optimizar las políticas)
- Auth completa: registro con confirmación de email, login, onboarding corto
- Catálogo semilla de 29 vinos españoles investigados (Rioja/Ribera del Duero/Priorat) con confianza honesta (solo 5 de 29 en "alto")
- Búsqueda de catálogo, añadir/editar/eliminar botellas, fallback manual sin valorar, aviso de añada distinta
- Dashboard: valor total, desglose por región (gráfico validado con la skill de dataviz), distribución de confianza
- Landing real con muestra del catálogo y disclaimer legal; barrido de copy sin lenguaje de recomendación personalizada
- `get_advisors` limpio (security y performance, salvo INFO de índices nuevos sin uso todavía y el WARN de "leaked password protection" que requiere activarse desde el Dashboard de Supabase, no vía SQL/MCP)

### Pendiente
- Despliegue a Vercel (requiere confirmación explícita del usuario en el chat antes de cada `deploy_to_vercel`)
- Prueba de aislamiento RLS a través de dos cuentas reales en la UI (bloqueada en la sesión de build por el rate limit de emails de Supabase tras las pruebas repetidas; la lógica ya está verificada exhaustivamente a nivel de política SQL)
- Activar manualmente en el Dashboard de Supabase: "Leaked password protection" (Authentication → Policies)
- Bug conocido de Radix Presence en Dropdown/Select/Tooltip (ver tarea flotante ya registrada) — Dialog y Popover ya corregidos en sus puntos de uso

---

## Instrucciones de trabajo

1. Ante cualquier migración SQL: crear el archivo en `supabase/migrations/` con timestamp en el nombre, aplicar vía `apply_migration`, verificar con `list_tables` + `get_advisors`.
2. Tras cada migración que cambie el esquema: regenerar tipos con `generate_typescript_types` y actualizar `src/types/database.types.ts`.
3. Tras cada sprint, hacer commit con mensaje descriptivo.
4. Ante cualquier duda de diseño de producto, priorizar la honestidad de la valoración sobre la completitud — es mejor mostrar "sin valorar" que fingir precisión que no existe.
5. Nunca desplegar a Vercel sin confirmación explícita del usuario para ese despliegue.
