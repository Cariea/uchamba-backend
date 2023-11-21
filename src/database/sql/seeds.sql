-- For Seeding the Database

--Users

INSERT INTO users (
  name,
  email,
  password,
  about_me,
  phone_number,
  residence_address,
  role,
  is_verified
) VALUES
  ('Jose Andres', 'jarodriguez.21@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy luffy', '04147664397', 'Direccion 1', 'admin', TRUE),
  ('Maria Paula', 'mpforero.21@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Boa', '04129873912', 'Direccion 2', 'admin', TRUE),
  ('Eduardo Arzolay', 'ejarzolay.21@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Sanji', '04165887448', 'Direccion 3', 'admin', TRUE),
  ('Alejandro Rosas', 'ajrosas.19@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Chopper', '04141919875', 'Direccion 4', 'admin', TRUE),
  ('Eduardo Sucre', 'ejsucre.19@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Daz Bonez', '04121320792', 'Direccion 5', 'admin', TRUE),
  ('Carmelo Naim', 'usuario6@example.com', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Panda Man', '04124992818', 'Direccion 6', 'admin', TRUE),
  ('Maria Gioretti ', 'mggiorgetti.17@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Nami', '04249033451', 'Direccion 7', 'admin', TRUE),
  ('Acosta Carrion', 'yeniffer.acosta3097@gmail.com', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Bibi', '04121856049', 'Direccion 8', 'admin', TRUE);

--Languages

INSERT INTO languages (
  name
) VALUES
  ('Espanol'),
  ('Ingles'),
  ('Frances'),
  ('Aleman'),
  ('Italiano'),
  ('Portugues'),
  ('Chino'),
  ('Japones'),
  ('Coreano'),
  ('Ruso'),
  ('Arabe'),
  ('Hindi'),
  ('Bengali'),
  ('Urdu'),
  ('Persa'),
  ('Turco'),
  ('Hebreo'),
  ('Griego'),
  ('Hungaro'),
  ('Polaco'),
  ('Checo'),
  ('Sueco'),
  ('Noruego'),
  ('Finlandes'),
  ('Danes'),
  ('Holandes'),
  ('Brasileno'),
  ('Rumano'),
  ('Bulgaro'),
  ('Croata'),
  ('Serbio'),
  ('Esloveno'),
  ('Macedonio'),
  ('Albanes'),
  ('Lituano'),
  ('Leton'),
  ('Estonio'),
  ('Eslovaco'),
  ('Esperanto'),
  ('Mongol'),
  ('Swahili'),
  ('Vietnamita'),
  ('Tailandes'),
  ('Malayo'),
  ('Tagalo'),
  ('Indonesio'),
  ('Farsi'),
  ('Kurdo');