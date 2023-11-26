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
  (4, 'Programming'),
  (4, 'Data Analysis'),
  (4, 'Machine Learning'),
  (4, 'Database Management'),
  (4, 'Web Development'),
  (4, 'Network Security'),
  (4, 'Software Testing'),
  (4, 'System Administration'),
  (4, 'Cloud Computing'),
  (4, 'Mobile App Development');
  
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
  (4, 'Effective Communication'),
  (4, 'Team Collaboration'),
  (4, 'Adaptability'),
  (4, 'Problem Solving'),
  (4, 'Creativity'),
  (4, 'Time Management'),
  (4, 'Leadership'),
  (4, 'Empathy'),
  (4, 'Conflict Resolution'),
  (4, 'Critical Thinking'),
  (4, 'Stress Management'),
  (4, 'Decision Making'),
  (4, 'Flexibility'),
  (4, 'Positive Attitude'),
  (4, 'Networking');

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
  (4, 1, 'A1'),
  (4, 2, 'A2'),
  (4, 3, 'B1'),
  (4, 4, 'B2'),
  (4, 5, 'C1'),
  (4, 6, 'C2'),
  (4, 7, 'A1'),
  (4, 8, 'A2'),
  (4, 9, 'B1'),
  (4, 10, 'B2'),
  (4, 11, 'C1'),
  (4, 12, 'C2'),
  (4, 13, 'A1'),
  (4, 14, 'A2'),
  (4, 15, 'B1');

-- Persona Links
INSERT INTO personal_links (
  user_id, 
  name, 
  url
  ) VALUES
  (4, 'LinkedIn', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1024px-LinkedIn_Logo.svg.png'),
  (4, 'GitHub', 'https://assets-global.website-files.com/5f5a53e153805db840dae2db/64e79ca5aff2fb7295bfddf9_github-que-es.jpg'),
  (4, 'Portfolio', 'https://media.istockphoto.com/id/1251693104/es/vector/poo-emoticon-emoji-cara-de-caca-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=tzIypiPXr1F0r6EAJLhXebSRhtqUeBxdEz2Et1VNBoE='),
  (4, 'X', 'https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png'),
  (4, 'Personal Blog', 'https://media.istockphoto.com/id/1251693104/es/vector/poo-emoticon-emoji-cara-de-caca-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=tzIypiPXr1F0r6EAJLhXebSRhtqUeBxdEz2Et1VNBoE='),
  (4, 'Stack Overflow', 'https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png'),
  (4, 'Behance', 'https://pbs.twimg.com/profile_images/636661084720500737/_QglFGym_400x400.jpg'),
  (4, 'Dribbble', 'https://widulife.com/wp-content/uploads/2021/05/A%C3%BAn-no-conoces-la-red-social-Dribble-3.png'),
  (4, 'Medium', 'https://fineproxy.org/wp-content/uploads/2023/07/medium.com_logo.png'),
  (4, 'Dev.to', 'https://res.cloudinary.com/practicaldev/image/fetch/s--7zXAI5wW--/c_limit,f_auto,fl_progressive,q_80,w_190/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8j7kvp660rqzt99zui8e.png');

COMMIT;
