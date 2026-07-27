-- auth.uid() se reevaluaba por fila; envolverlo en (select ...) hace que el
-- planner lo trate como una constante por consulta (recomendación oficial de Supabase).

drop policy "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using ((select auth.uid()) = id);

drop policy "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy "collection_items_select_own" on public.collection_items;
create policy "collection_items_select_own"
  on public.collection_items
  for select
  using ((select auth.uid()) = user_id);

drop policy "collection_items_insert_own" on public.collection_items;
create policy "collection_items_insert_own"
  on public.collection_items
  for insert
  with check ((select auth.uid()) = user_id);

drop policy "collection_items_update_own" on public.collection_items;
create policy "collection_items_update_own"
  on public.collection_items
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy "collection_items_delete_own" on public.collection_items;
create policy "collection_items_delete_own"
  on public.collection_items
  for delete
  using ((select auth.uid()) = user_id);
