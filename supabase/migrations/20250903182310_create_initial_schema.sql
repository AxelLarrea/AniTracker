-- Schema inicial

-- Extensiones
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";


-- Tabla de animes (funciona como cache de la API)
create table public.animes (
  id bigint primary key, -- Usamos el MAL ID o AniList ID
  title text not null,
  title_english text,
  title_romaji text,
  synopsis text,
  episodes integer,
  status text,
  season_year integer,
  season text,
  format text, -- TV, MOVIE, OVA, etc.
  genres text[],
  average_score integer,
  cover_image_large text,
  cover_image_medium text,
  banner_image text,
  start_date date,
  end_date date,
  external_links jsonb, -- Para guardar links a MAL, AniList, etc.
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices para la tabla animes
create index idx_animes_title on public.animes using gin(to_tsvector('english', title));
create index idx_animes_title_english on public.animes using gin(to_tsvector('english', coalesce(title_english, '')));
create index idx_animes_title_romaji on public.animes using gin(to_tsvector('english', coalesce(title_romaji, '')));
create index idx_animes_genres on public.animes using gin(genres);
create index idx_animes_status on public.animes(status);
create index idx_animes_season_year on public.animes(season_year);

-- Tabla de perfiles de usuario
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
   
  constraint username_length check (char_length(username) >= 3)
);

-- Tabla de lista de animes por usuario
create table public.user_anime_list (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null, -- id de usuario
  anime_id bigint references public.animes(id) on delete cascade not null, -- id de anime
  status text not null check (status in ('watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch')),
  score integer check (score >= 1 and score <= 10),
  progress integer default 0, -- episodios vistos
  start_date date,
  finish_date date,
  notes text,
  is_favorite boolean default false,
  rewatching boolean default false,
  times_rewatched integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  unique(user_id, anime_id)
);

-- Índices para la lista de usuarios
create index idx_user_anime_list_user_status on public.user_anime_list(user_id, status);
create index idx_user_anime_list_user_score on public.user_anime_list(user_id, score);
create index idx_user_anime_list_favorites on public.user_anime_list(user_id, is_favorite) where is_favorite = true;

-- Tabla de actividad/historial del usuario
create table public.user_activity (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  anime_id bigint references public.animes(id) on delete cascade not null,
  activity_type text not null check (activity_type in ('added', 'updated_status', 'updated_progress', 'rated', 'completed')),
  old_value text,
  new_value text,
  created_at timestamptz default now()
);

-- Índices para user_activity
create index idx_user_activity_user_date on public.user_activity(user_id, created_at desc);
create index idx_user_activity_user_anime_id_activity_type on public.user_activity(anime_id, activity_type, created_at desc);

-- Función para registrar actividad automáticamente
create or replace function public.log_user_activity()
returns trigger 
set search_path = ''
as $$
declare
  activity_type_val text;
  old_val text;
  new_val text;
begin
  -- Determinar tipo de actividad
  if TG_OP = 'INSERT' then
    activity_type_val := 'added';
    new_val := new.status;
  elsif TG_OP = 'UPDATE' then
    if old.status != new.status then
      activity_type_val := 'updated_status';
      old_val := old.status;
      new_val := new.status;
      
      -- Si cambió a completed, registrar como completed
      if new.status = 'completed' then
        activity_type_val := 'completed';
      end if;
    elsif old.progress != new.progress then
      activity_type_val := 'updated_progress';
      old_val := old.progress::text;
      new_val := new.progress::text;
    elsif (old.score is null and new.score is not null) or (old.score != new.score) then
      activity_type_val := 'rated';
      old_val := coalesce(old.score::text, 'null');
      new_val := coalesce(new.score::text, 'null');
    else
      return new; -- No hay cambios significativos
    end if;
  else
    return new;
  end if;

  -- Insertar registro de actividad
  insert into public.user_activity (user_id, anime_id, activity_type, old_value, new_value)
  values (new.user_id, new.anime_id, activity_type_val, old_val, new_val);

  return new;
end;
$$ language plpgsql security definer;

-- Trigger para registrar actividad automáticamente
create trigger log_user_anime_activity
  after insert or update on public.user_anime_list
  for each row execute procedure public.log_user_activity();


-- Función para actualizar updated_at automáticamente
create or replace function public.handle_updated_at()
returns trigger 
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers para updated_at
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_user_anime_list_updated_at
  before update on public.user_anime_list
  for each row execute procedure public.handle_updated_at();

create trigger handle_animes_updated_at
  before update on public.animes
  for each row execute procedure public.handle_updated_at();

-- Función para crear perfil automáticamente cuando se registra un usuario
create or replace function public.handle_new_user()
returns trigger 
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, username, display_name)
  values (new.id, new.email, null, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para crear perfil automáticamente
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Row Level Security (RLS) Policies

-- Habilitar RLS en todas las tablas
alter table public.profiles enable row level security;
alter table public.user_anime_list enable row level security;
alter table public.user_activity enable row level security;

-- Policies para profiles
create policy "Usuarios pueden ver todos los perfiles públicos"
  on public.profiles for select
  using (true);

create policy "Usuarios pueden actualizar su propio perfil"
  on public.profiles for update
  using ((select auth.uid()) = id);

create policy "Usuarios pueden eliminar su propio perfil"
  on public.profiles for delete
  using ((select auth.uid()) = id);

-- Policies para user_anime_list
create policy "Usuarios pueden ver su propia lista"
  on public.user_anime_list for select
  using ((select auth.uid()) = user_id);

create policy "Usuarios pueden insertar en su propia lista"
  on public.user_anime_list for insert
  with check ((select auth.uid()) = user_id);

create policy "Usuarios pueden actualizar su propia lista"
  on public.user_anime_list for update
  using ((select auth.uid()) = user_id);

create policy "Usuarios pueden eliminar de su propia lista"
  on public.user_anime_list for delete
  using ((select auth.uid()) = user_id);

-- Policies para user_activity
create policy "Usuarios pueden ver su propia actividad"
  on public.user_activity for select
  using ((select auth.uid()) = user_id);

create policy "Sistema puede insertar actividad"
  on public.user_activity for insert
  with check ((select auth.uid()) = user_id);

-- Policies para animes
alter table public.animes enable row level security;

create policy "Todos pueden ver animes"
  on public.animes for select 
  using (true);
