-- For Seeding the Database
BEGIN;

--Users
INSERT INTO users (
  name,
  email,
  password,
  about_me,
  phone_number,
  country,
  state,
  city,
  residence_address,
  role,
  is_active
) VALUES
  ('Jose Andres', 'jarodriguez.21@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy luffy', '04147664397', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 1', 'admin', TRUE),
  ('Maria Paula', 'mpforero.21@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Boa', '04129873912', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 2', 'admin', TRUE),
  ('Eduardo Arzolay', 'ejarzolay.21@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Sanji', '04165887448', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 3', 'admin', TRUE),
  ('Alejandro Rosas', 'ajrosas.19@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Chopper', '04141919875', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 4', 'admin', TRUE),
  ('Eduardo Sucre', 'ejsucre.19@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Daz Bonez', '04121320792', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 5', 'admin', TRUE),
  ('Carmelo Naim', 'usuario6@example.com', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Panda Man', '04124992818', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 6', 'admin', TRUE),
  ('Maria Gioretti ', 'mggiorgetti.17@est.ucab.edu.ve', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Soy Nami', '04249033451', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 7', 'admin', TRUE),
  ('Acosta Carrion', 'yeniffer.acosta3097@gmail.com', '$2b$10$.pmTkQ1lZV2D0o2tWPNcN.7DTJFVo3DZmaMhcIuWZuOkEzYkmvbKG', 'Bibi', '04121856049', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Direccion 8', 'admin', TRUE);

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

-- UCAB Careers
INSERT INTO ucareers (
  name
) VALUES
  ('Ingenieria Informatica'),
  ('Ingenieria Civil'),
  ('Ingenieria Industrial'),
  ('Relaciones Industriales'),
  ('Educacion'),
  ('Comunicacion Social'),
  ('Derecho'),
  ('Administracion de Empresas'),
  ('Contaduria Publica');
  
--Hard Skills
INSERT INTO hard_skills (
  name
) VALUES
  ('Java'),
  ('Python'),
  ('C++'),
  ('JavaScript'),
  ('HTML'),
  ('CSS'),
  ('SQL'),
  ('React'),
  ('Angular'),
  ('Node.js'),
  ('Git'),
  ('Docker'),
  ('Machine Learning'),
  ('Data Analysis'),
  ('Agile Methodology');
  
-- Personal Hard Skills 
INSERT INTO personal_hard_skills (
  user_id, 
  name
) VALUES
  (1, 'Programming'),
  (2, 'Data Analysis'),
  (3, 'Machine Learning'),
  (4, 'Database Management'),
  (5, 'Web Development'),
  (6, 'Network Security'),
  (7, 'Software Testing'),
  (8, 'System Administration'),
  (1, 'Cloud Computing'),
  (2, 'Mobile App Development');
  
-- Soft Skills
INSERT INTO soft_skills (
  name
) VALUES
  ('Communication'),
  ('Teamwork'),
  ('Adaptability'),
  ('Problem Solving'),
  ('Creativity'),
  ('Time Management'),
  ('Leadership'),
  ('Empathy'),
  ('Conflict Resolution'),
  ('Critical Thinking'),
  ('Stress Management'),
  ('Decision Making'),
  ('Flexibility'),
  ('Positive Attitude'),
  ('Networking');

-- Personal Soft Skills
INSERT INTO personal_soft_skills (
  user_id, 
  name
) VALUES
  (1, 'Effective Communication'),
  (2, 'Team Collaboration'),
  (3, 'Adaptability'),
  (4, 'Problem Solving'),
  (5, 'Creativity'),
  (6, 'Time Management'),
  (7, 'Leadership'),
  (8, 'Empathy'),
  (1, 'Conflict Resolution'),
  (2, 'Critical Thinking'),
  (3, 'Stress Management'),
  (4, 'Decision Making'),
  (5, 'Flexibility'),
  (6, 'Positive Attitude'),
  (7, 'Networking');

INSERT INTO personal_links (
  user_id, 
  url
) VALUES
  (1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1024px-LinkedIn_Logo.svg.png'),
  (2, 'https://assets-global.website-files.com/5f5a53e153805db840dae2db/64e79ca5aff2fb7295bfddf9_github-que-es.jpg'),
  (3, 'https://media.istockphoto.com/id/1251693104/es/vector/poo-emoticon-emoji-cara-de-caca-ilustracion-vectorial.jpg?s=612x612&w=0&k=20&c=tzIypiPXr1F0r6EAJLhXebSRhtqUeBxdEz2Et1VNBoE='),
  (4, 'https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png'),
  (5, 'https://media.istockphoto.com/id/1251693104/es/vector/poo-emoticon-emoji-cara-de-caca-ilustracion-vectorial.jpg?s=612x612&w=0&k=20&c=tzIypiPXr1F0r6EAJLhXebSRhtqUeBxdEz2Et1VNBoE='),
  (6, 'https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png'),
  (7, 'https://pbs.twimg.com/profile_images/636661084720500737/_QglFGym_400x400.jpg'),
  (8, 'https://widulife.com/wp-content/uploads/2021/05/A%C3%BAn-no-conoces-la-red-social-Dribble-3.png'),
  (1, 'https://fineproxy.org/wp-content/uploads/2023/07/medium.com_logo.png'),
  (2, 'https://res.cloudinary.com/practicaldev/image/fetch/s--7zXAI5wW--/c_limit,f_auto,fl_progressive,q_80,w_190/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8j7kvp660rqzt99zui8e.png');

INSERT INTO foreign_studies (
  user_id, 
  name, 
  university_name, 
  degree, 
  graduation_year
) VALUES
  (1, 'Study Abroad 1', 'Foreign University 1', 'pregrado', '2023-01-01'),
  (2, 'Study Abroad 2', 'Foreign University 2', 'maestria', '2024-01-01'),
  (3, 'Study Abroad 3', 'Foreign University 3', 'pregrado', '2022-01-01'),
  (4, 'Study Abroad 4', 'Foreign University 4', 'doctorado', '2025-01-01'),
  (5, 'Study Abroad 5', 'Foreign University 5', 'postgrado', '2024-01-01'),
  (6, 'Study Abroad 6', 'Foreign University 6', 'pregrado', '2023-01-01'),
  (7, 'Study Abroad 7', 'Foreign University 7', 'maestria', '2024-01-01'),
  (8, 'Study Abroad 8', 'Foreign University 8', 'pregrado', '2023-01-01'),
  (1, 'Study Abroad 9', 'Foreign University 9', 'maestria', '2025-01-01'),
  (2, 'Study Abroad 10', 'Foreign University 10', 'doctorado', '2026-01-01'),
  (3, 'Study Abroad 11', 'Foreign University 11', 'pregrado', '2023-01-01'),
  (4, 'Study Abroad 12', 'Foreign University 12', 'postgrado', '2024-01-01'),
  (5, 'Study Abroad 13', 'Foreign University 13', 'pregrado', '2023-01-01'),
  (6, 'Study Abroad 14', 'Foreign University 14', 'maestria', '2024-01-01'),
  (7, 'Study Abroad 15', 'Foreign University 15', 'pregrado', '2023-01-01');

-- Work Experiences
INSERT INTO work_experiences (
  user_id,
  organization_name,
  job_title,
  country,
  state,
  city,
  address,
  entry_date,
  departure_date,
  description
) VALUES
  (5, 'Lusitanos', 'Auxiliar de equipo', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Urbanizacion Moreno De Mendoza', '2016-04-13', '2022-10-31', 'Una recarga de agua con una panaderia al lado'),
  (5, 'Santo Tome', 'Empaquetador', 'Venezuela', 'Bolivar', 'Ciudad Guayana', 'Los olivos', '2010-10-10', '2015-04-12', 'Embolsaba las compras de los clientes y los ayudaba a llevarlas');

-- Projects
INSERT INTO projects (
  user_id,
  name,
  description,
  project_url,
  cover_image_id,
  cover_image_url
) VALUES
  (1, 'Proyecto de Base de Datos', 'Llevar el registro de los autos que llegan a un concesionario', null, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (2, 'Proyecto de Arquitectura', 'Armar un contador de 12 horas', 'https://arquicomberna.blogspot.com/2008/12/contador.html', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (3, 'Proyecto de Ingenieria de Requisitos', 'Realizar una pagina donde las empresas puedan contratar egresados ucabistas', 'https://www.mayoclinic.org/es/diseases-conditions/schizophrenia/symptoms-causes/syc-20354443', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (4, 'Offside', 'Album de barajitas del mundial', 'https://reglasdelfutbol.club/que-es-el-offiside/', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 'Offside', 'Album de barajitas del mundial', 'https://reglasdelfutbol.club/que-es-el-offiside/', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 'Proyecto de IHC', 'Sistema de gestion de la biblioteca UCAB', null, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (6, 'Proyecto de Contabilidad', 'Relacionar la Contabilidad con 3 ODS', null, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (7, 'Proyecto de Estructura', 'Calculadora en ensamblador', 'https://www.tecnologia-informatica.com/el-lenguaje-ensamblador/', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (8, 'Proyecto de Sistemas de operacion', 'Sistema Operativo', null, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg');

INSERT INTO projects_images (
  user_id,
  project_id,
  image_cloud_id,
  image_url
) VALUES
  (1, 1, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (2, 2, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (3, 3, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (4, 4, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 5, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 6, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (6, 7, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (7, 8, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (8, 9, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg');

-- User Languages
INSERT INTO users_languages (
  user_id, 
  language_id, 
  proficient_level,
  certificate_image_id,
  certificate_image_url
) VALUES
  (1, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (1, 2, 'B1', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (2, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (2, 2, 'B1', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (3, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (3, 2, 'B2', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (4, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (4, 2, 'B2', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 2, 'C1', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (6, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (6, 2, 'C2', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (7, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (7, 2, 'A1', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (8, 1, 'Native', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg');

--User Studies
INSERT INTO users_ustudies (
  user_id, 
  ucareer_id, 
  degree, 
  graduation_year
) VALUES
  (1, 1, 'pregrado', '2022-01-01'),
  (2, 2, 'postgrado', '2021-01-01'),
  (3, 3, 'maestria', '2022-01-01'),
  (4, 4, 'especializacion', '2023-01-01'),
  (5, 5, 'maestria', '2021-01-01'),
  (6, 6, 'doctorado', '2022-01-01'),
  (7, 7, 'pregrado', '2023-01-01'),
  (8, 8, 'pregrado', '2023-01-01'),
  (1, 2, 'pregrado', '2022-01-01'),
  (2, 1, 'pregrado', '2023-01-01');

INSERT INTO users_hard_skills (
  user_id, 
  hard_skill_id
) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (5, 9),
  (5, 10),
  (6, 11),
  (6, 12),
  (7, 13),
  (7, 14),
  (8, 15);

INSERT INTO users_soft_skills (
  user_id, 
  soft_skill_id
) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (5, 9),
  (5, 10),
  (6, 11),
  (6, 12),
  (7, 13),
  (7, 14),
  (8, 15);

COMMIT;
