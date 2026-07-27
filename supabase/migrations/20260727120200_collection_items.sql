-- Colección de botellas del usuario. Núcleo del aislamiento por RLS.

create table public.collection_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  reference_wine_id uuid references public.reference_wines (id) on delete set null,
  custom_wine_name text,
  custom_winery text,
  custom_region wine_region,
  vintage integer check (vintage between 1900 and 2100),
  quantity integer not null default 1 check (quantity > 0),
  condition bottle_condition not null default 'excelente',
  purchase_price_eur numeric(10, 2) check (purchase_price_eur >= 0),
  purchase_date date,
  purchase_location text,
  storage_notes text,
  personal_notes text,
  added_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_wine_reference_or_custom
    check (reference_wine_id is not null or custom_wine_name is not null)
);

create index idx_collection_items_user on public.collection_items (user_id);
create index idx_collection_items_reference_wine on public.collection_items (reference_wine_id);

alter table public.collection_items enable row level security;

create policy "collection_items_select_own"
  on public.collection_items
  for select
  using (auth.uid() = user_id);

create policy "collection_items_insert_own"
  on public.collection_items
  for insert
  with check (auth.uid() = user_id);

create policy "collection_items_update_own"
  on public.collection_items
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "collection_items_delete_own"
  on public.collection_items
  for delete
  using (auth.uid() = user_id);
