-- For Seeding the Database

-- Á 🐘 ├ü
-- á 🐘 ├í
-- É 🐘 ├ë
-- é 🐘 ├®
-- Í 🐘 ├ì
-- í 🐘 ├¡
-- Ó 🐘 ├ô
-- ó 🐘 ├│
-- Ú 🐘 ├Ü
-- ú 🐘 ├║
-- ñ 🐘 ├▒
-- ¿ 🐘 ┬┐

BEGIN;

--Users
INSERT INTO users (
  name,
  email,
  about_me,
  phone_number,
  country,
  state,
  city,
  residence_address,
  role,
  is_active
) VALUES
  ('Jos├® Andr├®s', 'jarodriguez.21@est.ucab.edu.ve', 'Soy luffy', '04147664397', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 1', 'admin', TRUE),
  ('Mar├¡a Paula', 'mpforero.21@est.ucab.edu.ve', 'Soy Boa', '04129873912', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 2', 'admin', TRUE),
  ('Eduardo Arzolay', 'ejarzolay.21@est.ucab.edu.ve', 'Soy Sanji', '04165887448', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 3', 'admin', TRUE),
  ('Alejandro Rosas', 'ajrosas.19@est.ucab.edu.ve', 'Soy Chopper', '04141919875', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 4', 'admin', TRUE),
  ('Eduardo Sucre', 'ejsucre.19@est.ucab.edu.ve', 'Soy Daz Bonez', '04121320792', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 5', 'admin', TRUE),
  ('Carmelo Naim', 'cjnaim.16@est.ucab.edu.ve', 'Soy Panda Man', '04124992818', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 6', 'admin', TRUE),
  ('Mar├¡a Giorgetti ', 'mggiorgetti.17@est.ucab.edu.ve', 'Soy Nami', '04249033451', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 7', 'admin', TRUE),
  ('Acosta Carrion', 'ynacosta.15@est.ucab.edu.ve', 'Bibi', '04121856049', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Direcci├│n 8', 'admin', TRUE);

--Languages
INSERT INTO languages (
  name
) VALUES
  ('Espa├▒ol'),
  ('Ingl├®s'),
  ('Franc├®s'),
  ('Alem├ín'),
  ('Italiano'),
  ('Portugu├®s'),
  ('Chino'),
  ('Japon├®s'),
  ('Coreano'),
  ('Ruso'),
  ('├ürabe'),
  ('Hindi'),
  ('Bengal├¡'),
  ('Urdu'),
  ('Persa'),
  ('Turco'),
  ('Hebreo'),
  ('Griego'),
  ('H├║ngaro'),
  ('Polaco'),
  ('Checo'),
  ('Sueco'),
  ('Noruego'),
  ('Finland├®s'),
  ('Dan├®s'),
  ('Holand├®s'),
  ('Brasile├▒o'),
  ('Rumano'),
  ('B├║lgaro'),
  ('Croata'),
  ('Serbio'),
  ('Esloveno'),
  ('Macedonio'),
  ('Alban├®s'),
  ('Lituano'),
  ('Let├│n'),
  ('Estonio'),
  ('Eslovaco'),
  ('Esperanto'),
  ('Mongol'),
  ('Swahili'),
  ('Vietnamita'),
  ('Tailand├®s'),
  ('Malayo'),
  ('Tagalo'),
  ('Indonesio'),
  ('Farsi'),
  ('Kurdo');

-- UCAB Careers
INSERT INTO ucareers (
  name
) VALUES
  ('Administraci├│n de Empresas'),
  ('Comunicaci├│n Social'),
  ('Contadur├¡a P├║blica'),
  ('Derecho'),
  ('Educaci├│n'),
  ('Ingenier├¡a Civil'),
  ('Ingenier├¡a Industrial'),
  ('Ingenier├¡a Inform├ítica'),
  ('Relaciones Industriales');
  
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
  ('Aprendizaje autom├ítico (Machine Learning)'),
  ('An├ílisis de datos (Data Analysis)'),
  ('Metodolog├¡a ├ígil (Agile Methodology)');
  
-- Personal Hard Skills 
INSERT INTO personal_hard_skills (
  user_id, 
  name
) VALUES
  (1, 'Programaci├│n'),
  (2, 'An├ílisis de datos'),
  (3, 'Aprendizaje de M├íquina'),

  (4, 'Gesti├│n de bases de datos'),
  (4, 'Generador de seeds'),
  (4, 'Godot'),

  (5, 'Desarrollo web'),
  (6, 'Seguridad de redes'),
  (7, 'Pruebas de software'),
  (8, 'Administraci├│n de sistemas'),
  (1, 'Computaci├│n en la nube'),
  (2, 'Desarrollo de aplicaciones m├│viles');
  
-- Soft Skills
INSERT INTO soft_skills (
  name
) VALUES
  ('Comunicaci├│n'),
  ('Trabajo en equipo'),
  ('Adaptabilidad'),
  ('Resoluci├│n de problemas'),
  ('Creatividad'),
  ('Gesti├│n del tiempo'),
  ('Liderazgo'),
  ('Empat├¡a'),
  ('Resoluci├│n de conflictos'),
  ('Pensamiento cr├¡tico'),
  ('Gesti├│n del estres'),
  ('Toma de decisiones'),
  ('Flexibilidad'),
  ('Actitud positiva'),
  ('Networking');

-- Personal Soft Skills
INSERT INTO personal_soft_skills (
  user_id, 
  name
) VALUES
  (1, 'Comunicaci├│n efectiva'),
  (2, 'Colaboraci├│n en equipo'),
  (3, 'Adaptable'),

  (4, 'Resoluci├│n de problemas internos'),
  (4, 'Creatividad en producto'),
  (4, 'Preocuparse por el otro'),

  (5, 'Creatividad en Producto'),
  (6, 'Organizaci├│n del tiempo'),
  (7, 'Liderazgo de Equipos'),
  (8, 'Asertividad');

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
  (4, 'Desarrollo Web/Frontend', 'UNIR Colombia', 'maestria', '2019-01-01'),
  (4, 'Biotecnolog├¡a Avanzada', 'UAB Barcelona', 'postgrado', '2024-01-01'),
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
  freelancer,
  entry_date,
  departure_date,
  description
) VALUES
  (4, 'JDM', 'Desarrollador', null, null, null, null, TRUE, '2022-07-20', null, 'Estoy actualmente trabajando como Desarrollador Fullstack para el desarrollo de una aplicaci├│n de gesti├│n de inventario/ventas/compras de la empresa y balance general'),
  (4, 'UChamba', 'L├¡der/Desarrollador Back-end', null, null, null, null, TRUE, '2023-04-20', null, 'Actualmente apoyo en el desarrollo de una aplicaci├│n que busca permitirle a los egresados generar sus Curriculums Vitae y mostrarse al mundo para aumentar sus niveles de empleabilidad, soy desarrollador pero ademas gesti├│no y delego tareas a los distintos integrantes del equipo de back-end'),
  (4, 'Leafeon App', 'L├¡der/Desarrollador Back-end', null, null, null, null, TRUE, '2023-04-20', '2023-07-17', 'Trabaj├® como L├¡der y Desarrollador en esta aplicaci├│n que ten├¡a como objetivo gesti├│nar todos los flujos de una empresa que se encargaba en la prestaci├│n de servicios de mantenimiento a veh├¡culos'),
  (4, 'Offside', 'Desarrollador Front-end', null, null, null, null, TRUE, '2022-09-20', '2023-01-14', 'Me centr├® en el desarrollo del Front-end de la aplicacion m├│vil de Offside haciendo uso de React Native como tecnolog├¡a de desarrollo'),
  (5, 'Lusitanos', 'Auxiliar de equipo', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Urbanizaci├│n Moreno De Mendoza', FALSE, '2016-04-13', '2022-10-31', 'Una recarga de agua con una panader├¡a al lado'),
  (5, 'Santo Tome', 'Empaquetador', 'Venezuela', 'Bol├¡var', 'Ciudad Guayana', 'Los olivos', FALSE, '2010-10-10', '2015-04-12', 'Embolsaba las compras de los clientes y los ayudaba a llevarlas');

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
  (3, 'Proyecto de Ingenier├¡a de Requisitos', 'Realizar una pagina donde las empresas puedan contratar egresados ucabistas', 'https://www.mayoclinic.org/es/diseases-conditions/schizophrenia/symptoms-causes/syc-20354443', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (4, 'Offside', 'Album de barajitas del mundial', 'https://reglasdelfutbol.club/que-es-el-offiside/', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 'Offside', 'Album de barajitas del mundial', 'https://reglasdelfutbol.club/que-es-el-offiside/', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (5, 'Proyecto de IHC', 'Sistema de gesti├│n de la biblioteca UCAB', null, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (6, 'Proyecto de Contabilidad', 'Relacionar la Contabilidad con 3 ODS', null, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (7, 'Proyecto de Estructura', 'Calculadora en ensamblador', 'https://www.tecnologia-informatica.com/el-lenguaje-ensamblador/', 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg'),
  (8, 'Proyecto de Sistemas de operaci├│n', 'Sistema Operativo', null, 'sxtl224gg4723ddlkp6e', 'https://res.cloudinary.com/dypukp3t0/image/upload/v1701854318/replit/sxtl224gg4723ddlkp6e.jpg');

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
  (1, 1, 'Native', null, null),
  (1, 2, 'B1', null, null),
  (2, 1, 'Native', null, null),
  (2, 2, 'B1', null, null),
  (3, 1, 'Native', null, null),
  (3, 2, 'B2', null, null),

  -- Alejandro Rosas
  (4, 1, 'Native', null, null),
  (4, 2, 'B2', null, null),
  (4, 3, 'B2', null, null),
  (4, 4, 'A1', null, null),
  (4, 5, 'A2', null, null),
  (4, 6, 'C1', null, null),

  (5, 1, 'Native', null, null),
  (5, 2, 'C1', null, null),
  (6, 1, 'Native', null, null),
  (6, 2, 'C2', null, null),
  (7, 1, 'Native', null, null),
  (7, 2, 'A1', null, null),
  (8, 1, 'Native', null, null);

--User Studies
INSERT INTO users_ustudies (
  user_id, 
  ucareer_id, 
  degree, 
  graduation_year
) VALUES
  (1, 1, 'pregrado', '2022-01-01'),
  (2, 2, 'pregrado', '2021-01-01'),
  (3, 3, 'pregrado', '2022-01-01'),

  (4, 8, 'pregrado', '2023-01-01'),
  (4, 9, 'pregrado', '2022-01-01'),

  (5, 5, 'pregrado', '2021-01-01'),
  (6, 6, 'pregrado', '2022-01-01'),
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

INSERT INTO users_cvs (
  user_id,
  ucareer_id,
  name
) VALUES
  (4, 8, 'Desarrollador Fullstack'),
  (4, 8, 'Desarrollador Back-end'),
  (4, 8, 'Desarrollador Front-end');

INSERT INTO cv_hard_skills (
  user_id,
  cv_id,
  hard_skill_id,
  order_index
) VALUES
  (4, 1, 7, 0),
  (4, 1, 8, 4),

  (4, 2, 7, 1),
  (4, 2, 8, 3),

  (4, 3, 7, 2),
  (4, 3, 8, 0);

INSERT INTO cv_personal_hard_skills (
  user_id,
  cv_id,
  phard_skill_id,
  order_index
) VALUES
  (4, 1, 4, 1),
  (4, 1, 6, 2),
  (4, 1, 5, 3),

  (4, 2, 4, 0),
  (4, 2, 6, 2),
  (4, 2, 5, 4),

  (4, 3, 4, 3),
  (4, 3, 6, 4),
  (4, 3, 5, 1);

INSERT INTO cv_soft_skills (
  user_id,
  cv_id,
  soft_skill_id,
  order_index
) VALUES
  (4, 1, 7, 4),
  (4, 1, 8, 0),

  (4, 2, 7, 1),
  (4, 2, 8, 3),

  (4, 3, 7, 2),
  (4, 3, 8, 0);

INSERT INTO cv_personal_soft_skills (
  user_id,
  cv_id,
  psoft_skill_id,
  order_index
) VALUES
  (4, 1, 4, 1),
  (4, 1, 6, 2),
  (4, 1, 5, 3),

  (4, 2, 4, 0),
  (4, 2, 6, 2),
  (4, 2, 5, 4),

  (4, 3, 4, 3),
  (4, 3, 6, 4),
  (4, 3, 5, 1);

INSERT INTO cv_ustudies (
  user_id,
  cv_id,
  ucareer_id
) VALUES
  (4, 1, 8),
  (4, 2, 8),
  (4, 3, 8);

INSERT INTO cv_foreign_studies (
  user_id,
  cv_id,
  foreign_study_id
) VALUES
  (4, 1, 4),
  (4, 1, 5),
  (4, 2, 5),
  (4, 3, 4);

INSERT INTO cv_work_experiences (
  user_id,
  cv_id,
  work_exp_id
) VALUES
  (4, 1, 1),
  (4, 1, 2),
  (4, 1, 3),
  (4, 1, 4),

  (4, 2, 1),
  (4, 2, 2),
  (4, 2, 3),

  (4, 3, 1),
  (4, 3, 4);

INSERT INTO cv_languages (
  user_id,
  cv_id,
  language_id
) VALUES
  (4, 1, 1),
  (4, 1, 2),
  (4, 1, 3),
  (4, 1, 4),
  (4, 1, 5),

  (4, 2, 5),
  (4, 2, 4),
  (4, 2, 3),
  (4, 2, 2),
  (4, 2, 1),

  (4, 3, 1),
  (4, 3, 6),
  (4, 3, 2);

COMMIT;
