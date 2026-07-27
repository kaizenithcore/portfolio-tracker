-- El trigger de creación de perfil no debe ser invocable directamente vía la API REST
revoke execute on function public.handle_new_user() from anon, authenticated;
