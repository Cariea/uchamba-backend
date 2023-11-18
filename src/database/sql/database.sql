BEGIN;

-- Domains and Types
CREATE DOMAIN dom_name VARCHAR(64);
CREATE DOMAIN dom_description VARCHAR(256);
CREATE DOMAIN dom_phone_number VARCHAR(16);
CREATE DOMAIN dom_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TYPE dom_role AS ENUM ('admin', 'graduated');
CREATE TYPE dom_time_unit AS ENUM ('months', 'years');
CREATE TYPE dom_skill AS ENUM ('blanda', 'dura');
CREATE TYPE dom_degree AS ENUM ('pregrado', 'postgrado', 'especializacion', 'maestria', 'doctorado');
CREATE TYPE dom_proficiency_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- 1
CREATE TABLE users (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  about_me TEXT DEFAULT '',
  phone_number dom_phone_number,
  residence_address TEXT DEFAULT '',
  role dom_role NOT NULL DEFAULT 'graduated',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  confirmation_code VARCHAR(6),
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);

-- 2
CREATE TABLE languages (
  language_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_language_id PRIMARY KEY (language_id)
);

-- 3
CREATE TABLE ucareers (
  ucareer_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_ucareer_id PRIMARY KEY (ucareer_id)
);

-- 4
CREATE TABLE technologies (
  technology_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_technology_id PRIMARY KEY (technology_id)
);

-- 4.1
CREATE TABLE tech_categories(
  technology_id INTEGER,
  category_name dom_name,
  created_at dom_created_at,
  CONSTRAINT pk_technology_category_id PRIMARY KEY (technology_id, category_name)
);

-- 5
CREATE TABLE skills (
  user_id INTEGER,
  skill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  description dom_name NOT NULL,
  type character varying(1) NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_skill_id PRIMARY KEY (user_id, skill_id)
);

-- 6
CREATE TABLE personal_links (
  user_id INTEGER,
  link_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  url TEXT DEFAULT '',
  created_at dom_created_at,
  CONSTRAINT pk_user_link_id PRIMARY KEY (user_id, link_id)
);

-- 7
CREATE TABLE foreign_studies (
  user_id INTEGER,
  foreign_study_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  university_name dom_name NOT NULL,
  degree dom_degree NOT NULL,
  graduation_date DATE DEFAULT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_foreign_study_id PRIMARY KEY (user_id, foreign_study_id)
);

-- 8
CREATE TABLE work_experiences (
  user_id INTEGER,
  work_exp_id INTEGER GENERATED ALWAYS AS IDENTITY,
  organization_name dom_name NOT NULL,
  job_title dom_name NOT NULL,
  address TEXT DEFAULT '',
  entry_date DATE NOT NULL,
  departure_date DATE,
  description TEXT DEFAULT '',
  created_at dom_created_at,
  CONSTRAINT pk_user_work_xp_id PRIMARY KEY (user_id, work_exp_id)
);

-- 9
CREATE TABLE projects (
  user_id INTEGER,
  project_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  description TEXT DEFAULT '',
  project_url TEXT DEFAULT '',
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_project_id PRIMARY KEY (user_id, project_id)
);

-- 10
CREATE TABLE users_languages (
  user_id INTEGER,
  language_id INTEGER,
  proficient_level dom_proficiency_level NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_language_id PRIMARY KEY (user_id, language_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_language_id FOREIGN KEY (language_id) REFERENCES languages
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 11
CREATE TABLE users_technologies (
  user_id INTEGER,
  technology_id INTEGER,
  time_unit dom_time_unit DEFAULT NULL,
  time_value INTEGER DEFAULT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_technology_id PRIMARY KEY (user_id, technology_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_technology_id FOREIGN KEY (technology_id) REFERENCES technologies
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT chk_time_usage CHECK (
    (time_unit IS NOT NULL AND time_value IS NOT NULL) OR 
    (time_unit IS NULL AND time_value IS NULL)
  )
);

-- 12
CREATE TABLE users_ustudies (
  user_id INTEGER,
  ucareer_id INTEGER,
  degree dom_degree NOT NULL DEFAULT 'pregrado',
  graduation_date DATE NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_ucareer_id PRIMARY KEY (user_id, ucareer_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_ucareer FOREIGN KEY (ucareer_id) REFERENCES ucareers
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 13
CREATE TABLE projects_images (
  user_id INTEGER,
  project_id INTEGER,
  image_url TEXT, -- 🔥 Revisar manejo de imagenes en el servidor 🔥
  created_at dom_created_at,
  CONSTRAINT pk_project_image_id PRIMARY KEY (user_id, project_id, image_url),
  CONSTRAINT fk_user_project_id FOREIGN KEY (user_id, project_id) REFERENCES projects
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

COMMIT;
