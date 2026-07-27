-- PostgreSQL concede EXECUTE a PUBLIC por defecto al crear una función;
-- revocar explícitamente de PUBLIC además de anon/authenticated
revoke execute on function public.handle_new_user() from public;
