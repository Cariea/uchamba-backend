BEGIN;

-- Domains and Types
CREATE DOMAIN dom_name VARCHAR(64);
CREATE DOMAIN dom_description VARCHAR(256);
CREATE DOMAIN dom_phone_number VARCHAR(16);
CREATE DOMAIN dom_location VARCHAR(64);
CREATE DOMAIN dom_email VARCHAR(64);
CREATE DOMAIN dom_password VARCHAR(64);
CREATE DOMAIN dom_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TYPE dom_role AS ENUM ('admin', 'graduated');
CREATE TYPE dom_degree AS ENUM ('pregrado', 'postgrado', 'especializacion', 'maestria', 'doctorado');
CREATE TYPE dom_proficiency_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native');

-- Dummy
CREATE TABLE ellucian_ethos (
  email dom_email,
  password dom_password,
  CONSTRAINT pk_ellucian PRIMARY KEY (email)
);

-- Egresados 🔥
-- CREATE TABLE undergraduates (
--   undergraduate_id VARCHAR(16),
--   email dom_email,
--   name dom_name NOT NULL,
--   residence_address TEXT DEFAULT NULL,
--   career VARCHAR(64) NOT NULL,
--   degree dom_degree NOT NULL,
--   graduation_year DATE NOT NULL,
--   CONSTRAINT pk_undergraduate_id PRIMARY KEY (undergraduate_id),
--   CONSTRAINT uk_career_per_undergraduate UNIQUE (undergraduate_id, career)
-- );

-- 1
CREATE TABLE users (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password dom_password NOT NULL,
  about_me TEXT DEFAULT NULL,
  phone_number dom_phone_number,
  country dom_location DEFAULT NULL,
  state dom_location DEFAULT NULL,
  city dom_location DEFAULT NULL,
  residence_address TEXT DEFAULT NULL,
  role dom_role NOT NULL DEFAULT 'graduated',
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
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
CREATE TABLE hard_skills (
  hard_skill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_hard_skill_id PRIMARY KEY (hard_skill_id)
);

-- 4.1
CREATE TABLE personal_hard_skills(
  user_id INTEGER,
  phard_skill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_phard_skill_id PRIMARY KEY (user_id, phard_skill_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uk_user_hard_name UNIQUE (user_id, name)
);

-- 5
CREATE TABLE soft_skills (
  soft_skill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_soft_skill_id PRIMARY KEY (soft_skill_id)
);

-- 5.1
CREATE TABLE personal_soft_skills (
  user_id INTEGER,
  psoft_skill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_psoft_skill_id PRIMARY KEY (user_id, psoft_skill_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uk_user_soft_name UNIQUE (user_id, name)
);

-- 6
CREATE TABLE personal_links (
  user_id INTEGER,
  link_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  url TEXT DEFAULT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_link_id PRIMARY KEY (user_id, link_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uk_user_url UNIQUE (user_id, url)
);

-- 7
CREATE TABLE foreign_studies (
  user_id INTEGER,
  foreign_study_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  university_name dom_name NOT NULL,
  degree dom_degree NOT NULL,
  graduation_year DATE DEFAULT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_foreign_study_id PRIMARY KEY (user_id, foreign_study_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uk_name_university_degree UNIQUE (user_id, name, university_name, degree)
);

-- 8
CREATE TABLE work_experiences (
  user_id INTEGER,
  work_exp_id INTEGER GENERATED ALWAYS AS IDENTITY,
  organization_name dom_name NOT NULL,
  job_title dom_name NOT NULL,
  country dom_location DEFAULT NULL,
  state dom_location DEFAULT NULL,
  city dom_location DEFAULT NULL,
  address TEXT DEFAULT NULL,
  entry_date DATE NOT NULL,
  departure_date DATE,
  description TEXT DEFAULT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_work_xp_id PRIMARY KEY (user_id, work_exp_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 9
CREATE TABLE projects (
  user_id INTEGER,
  project_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  description TEXT DEFAULT NULL,
  project_url TEXT DEFAULT NULL,
  cover_image_id VARCHAR(32) DEFAULT NULL,
  cover_image_url TEXT DEFAULT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_project_id PRIMARY KEY (user_id, project_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uk_user_project_name UNIQUE (user_id, name),
  CONSTRAINT uk_user_project_url UNIQUE (user_id, project_url)
);

-- 10
CREATE TABLE users_languages (
  user_id INTEGER,
  language_id INTEGER,
  proficient_level dom_proficiency_level NOT NULL,
  certificate_image_id VARCHAR(32) DEFAULT NULL,
  certificate_image_url TEXT DEFAULT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_language_id PRIMARY KEY (user_id, language_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_language_id FOREIGN KEY (language_id) REFERENCES languages
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 11
CREATE TABLE users_ustudies (
  user_id INTEGER,
  ucareer_id INTEGER,
  degree dom_degree NOT NULL DEFAULT 'pregrado',
  graduation_year DATE NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_ucareer_id PRIMARY KEY (user_id, ucareer_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_ucareer FOREIGN KEY (ucareer_id) REFERENCES ucareers (ucareer_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 12
CREATE TABLE users_hard_skills (
  user_id INTEGER,
  hard_skill_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_hard_skill_id PRIMARY KEY (user_id, hard_skill_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_hard_skill_id FOREIGN KEY (hard_skill_id) REFERENCES hard_skills (hard_skill_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 13
CREATE TABLE users_soft_skills (
  user_id INTEGER,
  soft_skill_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_soft_skill_id PRIMARY KEY (user_id, soft_skill_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_soft_skill_id FOREIGN KEY (soft_skill_id) REFERENCES soft_skills (soft_skill_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 14
CREATE TABLE projects_images (
  user_id INTEGER,
  project_id INTEGER,
  image_cloud_id VARCHAR(32),
  image_url TEXT,
  created_at dom_created_at,
  CONSTRAINT pk_project_image_id PRIMARY KEY (user_id, project_id, image_cloud_id),
  CONSTRAINT fk_user_project_id FOREIGN KEY (user_id, project_id) REFERENCES projects (user_id, project_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- Idea Innovadora

-- 15
CREATE TABLE cvs (
  user_id INTEGER,
  cv_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_cv_id PRIMARY KEY (user_id, cv_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 16
CREATE TABLE cv_hard_skill (
  user_id INTEGER,
  cv_id INTEGER,
  hard_skill_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_hs_id PRIMARY KEY (user_id, cv_id, hard_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_hs_id FOREIGN KEY (user_id, hard_skill_id) REFERENCES users_hard_skills (user_id, hard_skill_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 16.1
CREATE TABLE cv_personal_hard_skill (
  user_id INTEGER,
  cv_id INTEGER,
  phard_skill_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_phs_id PRIMARY KEY (user_id, cv_id, phard_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_phs_id FOREIGN KEY (user_id, phard_skill_id) REFERENCES personal_hard_skills (user_id, phard_skill_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 17
CREATE TABLE cv_soft_skill (
  user_id INTEGER,
  cv_id INTEGER,
  soft_skill_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_ss_id PRIMARY KEY (user_id, cv_id, soft_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_ss_id FOREIGN KEY (user_id, soft_skill_id) REFERENCES users_soft_skills (user_id, soft_skill_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 17.1
CREATE TABLE cv_personal_soft_skill (
  user_id INTEGER,
  cv_id INTEGER,
  psoft_skill_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_pss_id PRIMARY KEY (user_id, cv_id, psoft_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_pss_id FOREIGN KEY (user_id, psoft_skill_id) REFERENCES personal_soft_skills (user_id, psoft_skill_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 18
CREATE TABLE cv_ustudies (
  user_id INTEGER,
  cv_id INTEGER,
  ucareer_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_uc_id PRIMARY KEY (user_id, cv_id, ucareer_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_ucareer_id FOREIGN KEY (user_id, ucareer_id) REFERENCES users_ustudies (user_id, ucareer_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 18.1
CREATE TABLE cv_foreign_studies (
  user_id INTEGER,
  cv_id INTEGER,
  foreign_study_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_fs_id PRIMARY KEY (user_id, cv_id, foreign_study_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_fs_id FOREIGN KEY (user_id, foreign_study_id) REFERENCES foreign_studies (user_id, foreign_study_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 19
CREATE TABLE cv_work_experiences (
  user_id INTEGER,
  cv_id INTEGER,
  work_exp_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_we_id PRIMARY KEY (user_id, cv_id, work_exp_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_we_id FOREIGN KEY (user_id, work_exp_id) REFERENCES work_experiences (user_id, work_exp_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- 20
CREATE TABLE cv_languages (
  user_id INTEGER,
  cv_id INTEGER,
  language_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_language_id PRIMARY KEY (user_id, cv_id, language_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user_language_id FOREIGN KEY (user_id, language_id) REFERENCES users_languages (user_id, language_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- --------------------
-- TRIGGERS
-- --------------------

CREATE FUNCTION update_updated_at ()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_personal_hard_skills
BEFORE UPDATE ON personal_hard_skills
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_personal_soft_skills
BEFORE UPDATE ON personal_soft_skills
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_personal_links
BEFORE UPDATE ON personal_links
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_foreign_studies
BEFORE UPDATE ON foreign_studies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_user_languages
BEFORE UPDATE ON users_languages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_projects
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_cvs
BEFORE UPDATE ON cvs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

COMMIT;
