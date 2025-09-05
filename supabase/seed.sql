-- Seed data para testing

-- Insertar algunos animes de ejemplo
INSERT INTO public.animes (
  id, title, title_english, title_romaji, synopsis, episodes, status, season_year, season,
  format, genres, average_score, cover_image_large, cover_image_medium
) VALUES
(
  20958,
  '進撃の巨人',
  'Attack on Titan',
  'Shingeki no Kyojin',
  'Humans are nearly exterminated by giant creatures called Titans...',
  25,
  'FINISHED',
  2013,
  'SPRING',
  'TV',
  ARRAY['Action', 'Drama', 'Fantasy', 'Horror'],
  84,
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20958-HuFQyr54Mmir.jpg',
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20958-HuFQyr54Mmir.jpg'
),
(
  21459,
  '僕のヒーローアカデミア',
  'My Hero Academia',
  'Boku no Hero Academia',
  'In a world where most humans have developed superpowers called "Quirks"...',
  13,
  'FINISHED',
  2016,
  'SPRING',
  'TV',
  ARRAY['Action', 'Comedy', 'School', 'Shounen', 'Super Power'],
  77,
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-RoPwgrZ32gM3.jpg',
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21459-RoPwgrZ32gM3.jpg'
),
(
  11757,
  'Sword Art Online',
  'Sword Art Online',
  'Sword Art Online',
  'In the year 2022, virtual reality has progressed by leaps and bounds...',
  25,
  'FINISHED',
  2012,
  'SUMMER',
  'TV',
  ARRAY['Action', 'Adventure', 'Romance', 'Sci-Fi'],
  72,
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11757-NuIhHbUpFjHu.jpg',
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11757-NuIhHbUpFjHu.jpg'
),
(
  9253,
  'Steins;Gate',
  'Steins;Gate',
  'Steins;Gate',
  'Rintaro Okabe is a self-proclaimed "mad scientist"...',
  24,
  'FINISHED',
  2011,
  'SPRING',
  'TV',
  ARRAY['Drama', 'Sci-Fi', 'Supernatural', 'Thriller'],
  90,
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-0BLMFIgF2RJa.png',
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx9253-0BLMFIgF2RJa.png'
),
(
  1535,
  'Death Note',
  'Death Note',
  'Death Note',
  'Light Yagami is an ace student with great prospects...',
  37,
  'FINISHED',
  2006,
  'FALL',
  'TV',
  ARRAY['Drama', 'Psychological', 'Supernatural', 'Thriller'],
  85,
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-4r88a1tsBEIz.jpg',
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-4r88a1tsBEIz.jpg'
),
(
  16498,
  '進撃の巨人 Season 2',
  'Attack on Titan Season 2',
  'Shingeki no Kyojin Season 2',
  'For centuries, humanity has been hunted by giant, mysterious predators...',
  12,
  'FINISHED',
  2017,
  'SPRING',
  'TV',
  ARRAY['Action', 'Drama', 'Fantasy', 'Horror'],
  87,
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg',
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-C6FPmWm59CyP.jpg'
);

-- Función de ayuda para crear usuarios de testing (solo para desarrollo)
CREATE OR REPLACE FUNCTION public.create_test_user(email TEXT, password TEXT, display_name TEXT DEFAULT NULL)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
BEGIN
  RAISE NOTICE 'Creando usuario para: %', email;
  -- Insertar usuario en auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    email,
    crypt(password, gen_salt('bf'::text)),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    COALESCE(('{ "display_name":"' || display_name || '" }')::jsonb, '{}'::jsonb),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO user_id;

  RETURN user_id;
END;
$$;

-- Obtener el ID de los usuarios de prueba para crear datos de ejemplo
DO $$
DECLARE
  test_user1_id UUID;
  test_user2_id UUID;
  test_user3_id UUID;

BEGIN
  -- Crear usuarios de prueba
  SELECT create_test_user('test@example.com', 'password123', 'Test User 1') INTO test_user1_id;
  SELECT create_test_user('test2@example.com', 'password123', 'Test User 2') INTO test_user2_id;
  SELECT create_test_user('test3@example.com', 'password123', 'Test User 3') INTO test_user3_id;
  
  -- Actualizar perfiles de los usuarios de prueba
  UPDATE public.profiles 
  SET 
    username = 'testuser1',
    display_name = 'Usuario de Prueba 1',
    bio = 'Primer usuario de prueba'
  WHERE id = test_user1_id;

  UPDATE public.profiles 
  SET 
    username = 'testuser2',
    display_name = 'Usuario de Prueba 2',
    bio = 'Segundo usuario de prueba'
  WHERE id = test_user2_id;

  UPDATE public.profiles 
  SET 
    username = 'testuser3',
    display_name = 'Usuario de Prueba 3',
    bio = 'Tercer usuario de prueba'
  WHERE id = test_user3_id;

  -- Agregar algunos animes a la lista del usuario de prueba
  INSERT INTO public.user_anime_list (user_id, anime_id, status, score, progress) VALUES
  (test_user1_id, 20958, 'completed', 9, 25),    -- Attack on Titan
  (test_user1_id, 9253, 'completed', 10, 24),    -- Steins;Gate  
  (test_user1_id, 21459, 'dropped', null, 8),   -- My Hero Academia
  (test_user1_id, 1535, 'plan_to_watch', null, 0), -- Death Note
  (test_user1_id, 11757, 'watching', 6, 14),      -- SAO

  (test_user2_id, 20958, 'dropped', 9, 25),    -- Attack on Titan
  (test_user2_id, 9253, 'completed', 10, 24),    -- Steins;Gate  
  (test_user2_id, 21459, 'dropped', null, 8),   -- My Hero Academia
  (test_user2_id, 1535, 'plan_to_watch', null, 0), -- Death Note
  (test_user2_id, 11757, 'plan_to_watch', 6, 14),      -- SAO

  (test_user3_id, 20958, 'watching', 9, 25),    -- Attack on Titan
  (test_user3_id, 9253, 'completed', 10, 24),    -- Steins;Gate  
  (test_user3_id, 21459, 'plan_to_watch', null, 8),   -- My Hero Academia
  (test_user3_id, 1535, 'plan_to_watch', null, 0), -- Death Note
  (test_user3_id, 11757, 'watching', 6, 14);     -- SAO
END;
$$;