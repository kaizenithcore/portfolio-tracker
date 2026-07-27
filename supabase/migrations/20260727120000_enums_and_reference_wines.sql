-- Tipos enumerados y catálogo de referencia de vinos (solo lectura pública)

create type wine_region as enum ('rioja', 'ribera_del_duero', 'priorat');
create type wine_color as enum ('tinto', 'blanco', 'rosado', 'espumoso');
create type confidence_level as enum ('alto', 'medio', 'bajo');
create type bottle_condition as enum ('excelente', 'buena', 'aceptable', 'dañada');

create table public.reference_wines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  winery text not null,
  region wine_region not null,
  subregion text,
  color wine_color not null default 'tinto',
  vintage integer,
  grape_varieties text[],
  estimated_market_price_eur numeric(10, 2) not null check (estimated_market_price_eur >= 0),
  price_range_low_eur numeric(10, 2) check (price_range_low_eur >= 0),
  price_range_high_eur numeric(10, 2) check (price_range_high_eur >= 0),
  confidence_level confidence_level not null,
  confidence_rationale text not null,
  data_sources text[] not null default '{}',
  price_as_of_date date not null default current_date,
  external_search_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_reference_wines_region on public.reference_wines (region);
create index idx_reference_wines_search on public.reference_wines
  using gin (to_tsvector('spanish', name || ' ' || winery));

alter table public.reference_wines enable row level security;

-- Lectura pública de vinos activos; sin políticas de escritura para roles normales
-- (las altas/actualizaciones del catálogo solo llegan vía migraciones con service role)
create policy "reference_wines_select_active"
  on public.reference_wines
  for select
  using (is_active = true);
