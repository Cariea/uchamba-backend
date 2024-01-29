BEGIN;

-- Domains and Types
CREATE DOMAIN dom_name VARCHAR(64);
CREATE DOMAIN dom_description VARCHAR(256);
CREATE DOMAIN dom_phone_number VARCHAR(16);
CREATE DOMAIN dom_location VARCHAR(64);
CREATE DOMAIN dom_email VARCHAR(64);
CREATE DOMAIN dom_password VARCHAR(64);
-- FIX a razon de desfase de hora en el servidor
CREATE DOMAIN dom_created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP - INTERVAL '4' HOUR);

CREATE TYPE dom_role AS ENUM ('admin', 'graduated');
CREATE TYPE dom_degree AS ENUM ('pregrado', 'postgrado', 'especializacion', 'maestria', 'doctorado');
CREATE TYPE dom_proficiency_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native');

-- Dummy
CREATE TABLE ellucian (
  email dom_email,
  password dom_password,
  CONSTRAINT pk_ellucian PRIMARY KEY (email)
);

--Egresados 🔥
CREATE TABLE banner(
  undergraduate_id VARCHAR(16),
  name dom_name NOT NULL,
  email dom_email DEFAULT NULL,
  phone_number dom_phone_number DEFAULT NULL,
  career dom_name,
  residence_address TEXT DEFAULT NULL,
  campus dom_name,
  degree dom_degree,
  graduation_year DATE,
  CONSTRAINT pk_banner PRIMARY KEY (undergraduate_id,career),
  CONSTRAINT uq_email UNIQUE (email,career),
  CONSTRAINT uq_phone_number UNIQUE (phone_number,career)
);

-- 1
CREATE TABLE users (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  about_me TEXT DEFAULT NULL,
  phone_number dom_phone_number,
  country dom_location DEFAULT 'Venezuela',
  state dom_location DEFAULT 'Bol├¡var',
  city dom_location DEFAULT 'Ciudad Guayana',
  residence_address TEXT DEFAULT NULL,
  role dom_role NOT NULL DEFAULT 'graduated',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
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
    ON DELETE CASCADE,
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
    ON DELETE CASCADE,
  CONSTRAINT uk_user_soft_name UNIQUE (user_id, name)
);

-- 6
CREATE TABLE personal_links (
  user_id INTEGER,
  link_id INTEGER GENERATED ALWAYS AS IDENTITY,
  url TEXT DEFAULT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_link_id PRIMARY KEY (user_id, link_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
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
    ON DELETE CASCADE,
  CONSTRAINT uk_name_university_degree UNIQUE (user_id, name, university_name, degree),
  CONSTRAINT chk_graduation_year CHECK (CURRENT_TIMESTAMP > graduation_year)
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
  freelancer BOOLEAN NOT NULL,
  entry_date DATE NOT NULL,
  departure_date DATE DEFAULT NULL,
  description TEXT DEFAULT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_work_xp_id PRIMARY KEY (user_id, work_exp_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT chk_date CHECK (departure_date > entry_date OR departure_date IS NULL),
  CONSTRAINT chk_freelancer CHECK (
    (
      freelancer IS TRUE AND 
      country IS NULL AND
      state IS NULL AND
      city IS NULL AND
      address IS NULL
    )
    OR
    (
      freelancer IS FALSE AND 
      country IS NOT NULL AND
      state IS NOT NULL AND
      city IS NOT NULL AND
      address IS NOT NULL
    )
  ),
  CONSTRAINT chk_graduation_year CHECK (
    CURRENT_TIMESTAMP > departure_date AND
    CURRENT_TIMESTAMP > entry_date
  )
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
    ON DELETE CASCADE,
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
    ON DELETE CASCADE,
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
    ON DELETE CASCADE,
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
    ON DELETE CASCADE,
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
    ON DELETE CASCADE,
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
CREATE TABLE users_cvs (
  user_id INTEGER,
  cv_id INTEGER GENERATED ALWAYS AS IDENTITY,
  ucareer_id INTEGER,
  name VARCHAR(40) NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_cv_id PRIMARY KEY (user_id, cv_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_ucareer_id FOREIGN KEY (ucareer_id) REFERENCES ucareers (ucareer_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uk_career_name UNIQUE (user_id, ucareer_id, name)
);

-- 16
CREATE TABLE cv_hard_skills (
  user_id INTEGER,
  cv_id INTEGER,
  hard_skill_id INTEGER,
  order_index INTEGER NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_hs_id PRIMARY KEY (user_id, cv_id, hard_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_hs_id FOREIGN KEY (user_id, hard_skill_id) REFERENCES users_hard_skills (user_id, hard_skill_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 16.1
CREATE TABLE cv_personal_hard_skills (
  user_id INTEGER,
  cv_id INTEGER,
  phard_skill_id INTEGER,
  order_index INTEGER NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_phs_id PRIMARY KEY (user_id, cv_id, phard_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_phs_id FOREIGN KEY (user_id, phard_skill_id) REFERENCES personal_hard_skills (user_id, phard_skill_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 17
CREATE TABLE cv_soft_skills (
  user_id INTEGER,
  cv_id INTEGER,
  soft_skill_id INTEGER,
  order_index INTEGER NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_ss_id PRIMARY KEY (user_id, cv_id, soft_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_ss_id FOREIGN KEY (user_id, soft_skill_id) REFERENCES users_soft_skills (user_id, soft_skill_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 17.1
CREATE TABLE cv_personal_soft_skills (
  user_id INTEGER,
  cv_id INTEGER,
  psoft_skill_id INTEGER,
  order_index INTEGER NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_pss_id PRIMARY KEY (user_id, cv_id, psoft_skill_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_pss_id FOREIGN KEY (user_id, psoft_skill_id) REFERENCES personal_soft_skills (user_id, psoft_skill_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 18
CREATE TABLE cv_ustudies (
  user_id INTEGER,
  cv_id INTEGER,
  ucareer_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_uc_id PRIMARY KEY (user_id, cv_id, ucareer_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) 
    REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_ucareer_id FOREIGN KEY (user_id, ucareer_id) 
    REFERENCES users_ustudies (user_id, ucareer_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 18.1
CREATE TABLE cv_foreign_studies (
  user_id INTEGER,
  cv_id INTEGER,
  foreign_study_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_fs_id PRIMARY KEY (user_id, cv_id, foreign_study_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_fs_id FOREIGN KEY (user_id, foreign_study_id) REFERENCES foreign_studies (user_id, foreign_study_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 19
CREATE TABLE cv_work_experiences (
  user_id INTEGER,
  cv_id INTEGER,
  work_exp_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_we_id PRIMARY KEY (user_id, cv_id, work_exp_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_we_id FOREIGN KEY (user_id, work_exp_id) REFERENCES work_experiences (user_id, work_exp_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 20
CREATE TABLE cv_languages (
  user_id INTEGER,
  cv_id INTEGER,
  language_id INTEGER,
  created_at dom_created_at,
  CONSTRAINT pk_user_cv_language_id PRIMARY KEY (user_id, cv_id, language_id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_user_language_id FOREIGN KEY (user_id, language_id) REFERENCES users_languages (user_id, language_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- 21
CREATE TABLE cv_queue (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER,
  cv_id INTEGER,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_user_cv_id FOREIGN KEY (user_id, cv_id) REFERENCES users_cvs (user_id, cv_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- --------------------
-- TRIGGERS
-- --------------------

-- CREATE OR REPLACE FUNCTION insert_default_language()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   INSERT INTO users_languages (user_id, language_id, proficient_level)
--   VALUES (NEW.user_id, 1, 'Native');
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER after_insert_user
-- AFTER INSERT ON users
-- FOR EACH ROW
-- EXECUTE FUNCTION insert_default_language();

-- --------------------

CREATE FUNCTION update_updated_at ()
RETURNS TRIGGER AS $$
BEGIN
  -- FIX a razon de desfase de hora en servidor
  NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_personal_links
BEFORE UPDATE ON personal_links
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_projects
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_cvs
BEFORE UPDATE ON users_cvs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- --------------------

CREATE FUNCTION updated_at_users ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    WHERE ucv.user_id = OLD.user_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
      user_id,
      cv_id
  FROM users_cvs
  WHERE user_id = OLD.user_id;

  NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION updated_at_users();

-- --------------------

CREATE FUNCTION updated_at_users_languages ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    INNER JOIN cv_languages AS cvl ON
      ucv.user_id = cvl.user_id AND
      ucv.cv_id = cvl.cv_id
    WHERE
      ucv.user_id = OLD.user_id AND
      cvl.language_id = OLD.language_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
      ucv.user_id,
      ucv.cv_id
  FROM users_cvs AS ucv
  INNER JOIN cv_languages AS cvl ON
      ucv.user_id = cvl.user_id AND
      ucv.cv_id = cvl.cv_id
  WHERE
      ucv.user_id = OLD.user_id AND
      cvl.language_id = OLD.language_id;

  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
    RETURN NEW;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_user_languages
BEFORE UPDATE OR DELETE ON users_languages
FOR EACH ROW
EXECUTE FUNCTION updated_at_users_languages();

-- --------------------

CREATE FUNCTION updated_at_work_exp ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    INNER JOIN cv_work_experiences AS cvwe ON
      ucv.user_id = cvwe.user_id AND
      ucv.cv_id = cvwe.cv_id
    WHERE
      ucv.user_id = OLD.user_id AND
      cvwe.work_exp_id = OLD.work_exp_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
      ucv.user_id,
      ucv.cv_id
  FROM users_cvs AS ucv
  INNER JOIN cv_work_experiences AS cvwe ON
      ucv.user_id = cvwe.user_id AND
      ucv.cv_id = cvwe.cv_id
  WHERE
      ucv.user_id = OLD.user_id AND
      cvwe.work_exp_id = OLD.work_exp_id;

  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
    RETURN NEW;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_work_exp
BEFORE UPDATE OR DELETE ON work_experiences
FOR EACH ROW
EXECUTE FUNCTION updated_at_work_exp();

-- --------------------

CREATE FUNCTION updated_at_foreign_studies ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    INNER JOIN cv_foreign_studies AS cvfs ON
      ucv.user_id = cvfs.user_id AND
      ucv.cv_id = cvfs.cv_id
    WHERE
      ucv.user_id = OLD.user_id AND
      cvfs.foreign_study_id = OLD.foreign_study_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
    ucv.user_id,
    ucv.cv_id
  FROM users_cvs AS ucv
  INNER JOIN cv_foreign_studies AS cvfs ON
    ucv.user_id = cvfs.user_id AND
    ucv.cv_id = cvfs.cv_id
  WHERE
    ucv.user_id = OLD.user_id AND
    cvfs.foreign_study_id = OLD.foreign_study_id;

  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
    RETURN NEW;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_foreign_studies
BEFORE UPDATE OR DELETE ON foreign_studies
FOR EACH ROW
EXECUTE FUNCTION updated_at_foreign_studies();

-- --------------------

CREATE FUNCTION updated_at_hard_skills ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    INNER JOIN cv_hard_skills AS cvhs ON
      ucv.user_id = cvhs.user_id AND
      ucv.cv_id = cvhs.cv_id
    WHERE
      ucv.user_id = OLD.user_id AND
      cvhs.hard_skill_id = OLD.hard_skill_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
      ucv.user_id,
      ucv.cv_id
  FROM users_cvs AS ucv
  INNER JOIN cv_hard_skills AS cvhs ON
      ucv.user_id = cvhs.user_id AND
      ucv.cv_id = cvhs.cv_id
  WHERE
      ucv.user_id = OLD.user_id AND
      cvhs.hard_skill_id = OLD.hard_skill_id;

  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
    RETURN NEW;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_hard_skills
BEFORE UPDATE OR DELETE ON hard_skills
FOR EACH ROW
EXECUTE FUNCTION updated_at_hard_skills();

CREATE TRIGGER update_updated_at_users_hard_skills
BEFORE UPDATE OR DELETE ON users_hard_skills
FOR EACH ROW
EXECUTE FUNCTION updated_at_hard_skills();

-- --------------------

CREATE FUNCTION updated_at_personal_hard_skills ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    INNER JOIN cv_personal_hard_skills AS cvphs ON
      ucv.user_id = cvphs.user_id AND
      ucv.cv_id = cvphs.cv_id
    WHERE
      ucv.user_id = OLD.user_id AND
      cvphs.phard_skill_id = OLD.phard_skill_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
      ucv.user_id,
      ucv.cv_id
  FROM users_cvs AS ucv
  INNER JOIN cv_personal_hard_skills AS cvphs ON
      ucv.user_id = cvphs.user_id AND
      ucv.cv_id = cvphs.cv_id
  WHERE
      ucv.user_id = OLD.user_id AND
      cvphs.phard_skill_id = OLD.phard_skill_id;

  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
    RETURN NEW;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_personal_hard_skills
BEFORE UPDATE ON personal_hard_skills
FOR EACH ROW
EXECUTE FUNCTION updated_at_personal_hard_skills();

-- --------------------

CREATE FUNCTION updated_at_soft_skills ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    INNER JOIN cv_soft_skills AS cvss ON
      ucv.user_id = cvss.user_id AND
      ucv.cv_id = cvss.cv_id
    WHERE
      ucv.user_id = OLD.user_id AND
      cvss.soft_skill_id = OLD.soft_skill_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
      ucv.user_id,
      ucv.cv_id
  FROM users_cvs AS ucv
  INNER JOIN cv_soft_skills AS cvss ON
      ucv.user_id = cvss.user_id AND
      ucv.cv_id = cvss.cv_id
  WHERE
      ucv.user_id = OLD.user_id AND
      cvss.soft_skill_id = OLD.soft_skill_id;

  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
    RETURN NEW;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_soft_skills
BEFORE UPDATE OR DELETE ON soft_skills
FOR EACH ROW
EXECUTE FUNCTION updated_at_soft_skills();

CREATE TRIGGER update_updated_at_users_soft_skills
BEFORE UPDATE OR DELETE ON users_soft_skills
FOR EACH ROW
EXECUTE FUNCTION updated_at_soft_skills();

-- --------------------

CREATE FUNCTION updated_at_personal_soft_skills ()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_cvs
  SET name = name
  WHERE cv_id IN (
    SELECT ucv.cv_id
    FROM users_cvs AS ucv
    INNER JOIN cv_personal_soft_skills AS cvpss ON
      ucv.user_id = cvpss.user_id AND
      ucv.cv_id = cvpss.cv_id
    WHERE
      ucv.user_id = OLD.user_id AND
      cvpss.psoft_skill_id = OLD.psoft_skill_id
  );

  INSERT INTO cv_queue (user_id, cv_id)
  SELECT 
    ucv.user_id,
    ucv.cv_id
  FROM users_cvs AS ucv
  INNER JOIN cv_personal_soft_skills AS cvpss ON
    ucv.user_id = cvpss.user_id AND
    ucv.cv_id = cvpss.cv_id
  WHERE
    ucv.user_id = OLD.user_id AND
    cvpss.psoft_skill_id = OLD.psoft_skill_id;

  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
    RETURN NEW;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_personal_soft_skills
BEFORE UPDATE OR DELETE ON personal_soft_skills
FOR EACH ROW
EXECUTE FUNCTION updated_at_personal_soft_skills();

-- --------------------

COMMIT;
