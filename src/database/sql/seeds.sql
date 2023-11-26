-- For Seeding the Database
BEGIN;

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
  name, 
  url
) VALUES
  (1, 'LinkedIn', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1024px-LinkedIn_Logo.svg.png'),
  (2, 'GitHub', 'https://assets-global.website-files.com/5f5a53e153805db840dae2db/64e79ca5aff2fb7295bfddf9_github-que-es.jpg'),
  (3, 'Portfolio', 'https://media.istockphoto.com/id/1251693104/es/vector/poo-emoticon-emoji-cara-de-caca-ilustracion-vectorial.jpg?s=612x612&w=0&k=20&c=tzIypiPXr1F0r6EAJLhXebSRhtqUeBxdEz2Et1VNBoE='),
  (4, 'X', 'https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png'),
  (5, 'Personal Blog', 'https://media.istockphoto.com/id/1251693104/es/vector/poo-emoticon-emoji-cara-de-caca-ilustracion-vectorial.jpg?s=612x612&w=0&k=20&c=tzIypiPXr1F0r6EAJLhXebSRhtqUeBxdEz2Et1VNBoE='),
  (6, 'Stack Overflow', 'https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png'),
  (7, 'Behance', 'https://pbs.twimg.com/profile_images/636661084720500737/_QglFGym_400x400.jpg'),
  (8, 'Dribbble', 'https://widulife.com/wp-content/uploads/2021/05/A%C3%BAn-no-conoces-la-red-social-Dribble-3.png'),
  (1, 'Medium', 'https://fineproxy.org/wp-content/uploads/2023/07/medium.com_logo.png'),
  (2, 'Dev.to', 'https://res.cloudinary.com/practicaldev/image/fetch/s--7zXAI5wW--/c_limit,f_auto,fl_progressive,q_80,w_190/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8j7kvp660rqzt99zui8e.png');

-- Work Experiences
INSERT INTO work_experiences (
  user_id,
  organization_name,
  job_title,
  address,
  entry_date,
  departure_date,
  description
) VALUES
  (5,'Lusitanos','Auxiliar de equipo','Urbanización Moreno De Mendoza','2016-04-13','2022-10-31','Una recarga de agua con una panadería al lado'),
  (5,'Santo Tomé','Empaquetador','Los olivos','2010-10-10','2015-04-12','Embolsaba las compras de los clientes y los ayudaba a llevarlas');

-- Projects
INSERT INTO projects (
  user_id,
  name,
  description,
  project_url
) VALUES
  (1, 'Proyecto de Base de Datos', 'Llevar el registro de los autos que llegan a un concesionario', ''),
  (2, 'Proyecto de Arquitectura', 'Armar un contador de 12 horas', 'https://arquicomberna.blogspot.com/2008/12/contador.html'),
  (3, 'Proyecto de Ingenieria de Requisitos', 'Realizar una pagina donde las empresas puedan contratar egresados ucabistas', 'https://www.mayoclinic.org/es/diseases-conditions/schizophrenia/symptoms-causes/syc-20354443'),
  (4, 'Offside', 'Album de barajitas del mundial', 'https://reglasdelfutbol.club/que-es-el-offiside/'),
  (5, 'Proyecto de IHC', 'Sistema de gestion de la biblioteca UCAB', ''),
  (6, 'Proyecto de Contabilidad', 'Relacionar la Contabilidad con 3 ODS', ''),
  (7, 'Proyecto de Estructura', 'Calculadora en ensamblador', 'https://www.tecnologia-informatica.com/el-lenguaje-ensamblador/'),
  (8, 'Proyecto de Sistemas de operacion', 'Sistema Operativo', '');

-- User Languages
INSERT INTO users_languages (
  user_id, 
  language_id, 
  proficient_level
) VALUES
  (1, 1, 'A1'),
  (2, 2, 'A2'),
  (3, 3, 'B1'),
  (4, 4, 'B2'),
  (5, 5, 'C1'),
  (6, 6, 'C2'),
  (7, 7, 'A1'),
  (8, 8, 'A2'),
  (1, 9, 'B1'),
  (2, 10, 'B2'),
  (3, 11, 'C1'),
  (4, 12, 'C2'),
  (5, 13, 'A1'),
  (6, 14, 'A2'),
  (7, 15, 'B1');

--User Studies
INSERT INTO users_ustudies (
  user_id, 
  ucareer_id, 
  degree, 
  graduation_date
) VALUES
  (1, 1, 'pregrado', '2022-05-15'),
  (2, 2, 'postgrado', '2021-12-20'),
  (3, 3, 'maestria', '2022-08-30'),
  (4, 4, 'especializacion', '2023-06-10'),
  (5, 5, 'maestria', '2021-09-25'),
  (6, 6, 'doctorado', '2022-04-05'),
  (7, 7, 'pregrado', '2023-01-15'),
  (8, 8, 'pregrado', '2023-07-20'),
  (1, 9, 'pregrado', '2022-11-30'),
  (2, 10, 'pregrado', '2023-03-08');

COMMIT;
