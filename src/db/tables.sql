BEGIN;

-- Domains and Types
CREATE DOMAIN dom_name VARCHAR(64);
CREATE DOMAIN dom_description VARCHAR(256);
CREATE DOMAIN dom_phone_number VARCHAR(16);
CREATE DOMAIN dom_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
CREATE TYPE dom_role AS ENUM ('admin', 'graduated');
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
  residence_address TEXT DEFAULT '',
  role dom_role NOT NULL DEFAULT 'graduated',
  phone_number dom_phone_number,
  CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);

-- 2
CREATE TABLE universities (
  university_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  address TEXT DEFAULT '',
  CONSTRAINT pk_university_id PRIMARY KEY (university_id)
);

-- 3
CREATE TABLE careers (
  career_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  university_id INTEGER NOT NULL,
  CONSTRAINT pk_career_id PRIMARY KEY (career_id),
  CONSTRAINT fk_university_id FOREIGN KEY (university_id) REFERENCES universities
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 4
CREATE TABLE languages (
    language_id INTEGER GENERATED ALWAYS AS IDENTITY,
    name dom_name UNIQUE NOT NULL,
    CONSTRAINT pk_language_id PRIMARY KEY (language_id)
);

-- 5
CREATE TABLE skills (
    skill_id INTEGER GENERATED ALWAYS AS IDENTITY,
    description dom_name NOT NULL,
    type character varying(1) NOT NULL,
    CONSTRAINT pk_skill_id PRIMARY KEY (skill_id)
);

-- 6
CREATE TABLE technologies (
    technology_id INTEGER GENERATED ALWAYS AS IDENTITY,
    name dom_name UNIQUE NOT NULL,
    CONSTRAINT pk_technology_id PRIMARY KEY (technology_id)
);

-- 7
CREATE TABLE social_medias (
  social_media_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  image_link TEXT DEFAULT '',
  CONSTRAINT pk_social_media_id PRIMARY KEY (social_media_id)
);

-- 8
CREATE TABLE organizations (
  organization_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  address TEXT DEFAULT '',
  CONSTRAINT pk_organization_id PRIMARY KEY (organization_id)
);

-- 9
CREATE TABLE projects (
  project_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  description TEXT DEFAULT '',
  project_link TEXT DEFAULT '',
  user_id INTEGER NOT NULL,
  CONSTRAINT pk_project_id PRIMARY KEY (project_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 10
CREATE TABLE projects_images (
  project_id INTEGER,
  image_link TEXT,
  CONSTRAINT pk_project_image_id PRIMARY KEY (project_id, image_link),
  CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 11
CREATE TABLE users_studies (
  user_id INTEGER,
  career_id INTEGER,
  degree dom_degree NOT NULL DEFAULT 'pregrado',
  graduation_year DATE NOT NULL,
  CONSTRAINT pk_user_career_id PRIMARY KEY (user_id, career_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_career FOREIGN KEY (career_id) REFERENCES careers
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 12
CREATE TABLE users_languages (
  user_id INTEGER,
  language_id INTEGER,
  proficient_level dom_proficiency_level NOT NULL,
  CONSTRAINT pk_user_language_id PRIMARY KEY (user_id, language_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_language_id FOREIGN KEY (language_id) REFERENCES languages
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 13
CREATE TABLE users_skills (
  user_id INTEGER,
  skill_id INTEGER,
  CONSTRAINT pk_user_skill_id PRIMARY KEY (user_id, skill_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_skill_id FOREIGN KEY (skill_id) REFERENCES skills
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 14
CREATE TABLE users_technologies (
  user_id INTEGER,
  technology_id INTEGER,
  CONSTRAINT pk_user_technology_id PRIMARY KEY (user_id, technology_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_technology_id FOREIGN KEY (technology_id) REFERENCES technologies
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 15
CREATE TABLE users_socials (
  user_id INTEGER,
  social_media_id INTEGER,
  social_link TEXT NOT NULL,
  CONSTRAINT pk_user_social_id PRIMARY KEY (user_id, social_media_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_social_media_id FOREIGN KEY (social_media_id) REFERENCES social_medias
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 16
CREATE TABLE users_jobs (
  user_id INTEGER,
  organization_id INTEGER,
  job_title dom_name NOT NULL,
  description TEXT DEFAULT '',
  entry_date DATE NOT NULL,
  departure_date DATE,
  job_achievements TEXT DEFAULT '',
  CONSTRAINT pk_user_organization_id PRIMARY KEY (user_id, organization_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_organization_id FOREIGN KEY (organization_id) REFERENCES organizations
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

COMMIT;
