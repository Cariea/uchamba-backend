SELECT DISTINCT cv_id
FROM cv_queue

SELECT
  uus.ucareer_id,
  uc.name,
  COUNT(*)
FROM users_ustudies AS uus
INNER JOIN ucareers AS uc ON
  uus.ucareer_id = uc.ucareer_id
WHERE uus.ucareer_id NOT IN ('1', '8')
GROUP BY uus.ucareer_id, uc.name
ORDER BY uus.ucareer_id ASC;

SELECT
  language_id,
  proficient_level,
  COUNT(*)
FROM users_languages
GROUP BY
  language_id,
  proficient_level
ORDER BY 
  language_id ASC, 
  proficient_level ASC;



WITH AllLevels AS (
  SELECT
    language_id,
    level
  FROM (
    SELECT DISTINCT
      language_id,
      unnest(ARRAY['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1']::dom_proficiency_level[]) AS level
    FROM users_languages
  ) AS levels
)
SELECT
  al.language_id,
  languages.name,
  al.level AS proficient_level,
  COALESCE(SUM(COUNT(ul.user_id)) OVER (
    PARTITION BY al.language_id
    ORDER BY al.level DESC ROWS BETWEEN UNBOUNDED PRECEDING AND
    CURRENT ROW
  ), 0) AS total_occurrences
FROM AllLevels al
LEFT JOIN users_languages ul ON 
  al.language_id = ul.language_id AND 
  al.level::text = ul.proficient_level::text
INNER JOIN languages ON
  al.language_id = languages.language_id
GROUP BY al.language_id, languages.name, al.level
ORDER BY al.language_id,
CASE al.level
  WHEN 'Native' THEN 1
  WHEN 'C2' THEN 2
  WHEN 'C1' THEN 3
  WHEN 'B2' THEN 4
  WHEN 'B1' THEN 5
  WHEN 'A2' THEN 6
  WHEN 'A1' THEN 7
END;



SELECT
  hard_skill_id,
  COUNT(*)
FROM users_hard_skills
WHERE hard_skill_id IN ('3','2')
GROUP BY hard_skill_id
ORDER BY hard_skill_id;

SELECT
  soft_skill_id,
  COUNT(*)
FROM users_soft_skills
GROUP BY soft_skill_id
ORDER BY soft_skill_id;


-- For SQL Querie Creation
SELECT
  uc.cv_id,
  uc.ucareer_id,
  c.name AS career_name,
  uc.name,
  us.ucareer_id,
  fs.foreign_study_id
FROM
  users_cvs AS uc,
  ucareers AS c,
  cv_ustudies AS us,
  cv_foreign_studies AS fs
WHERE
  uc.user_id = 4 AND
  c.ucareer_id = uc.ucareer_id AND
  uc.cv_id = us.cv_id AND
  uc.cv_id = fs.cv_id
ORDER BY cv_id;

SELECT
  u.user_id,
  u.name,
  u.about_me,
  u.country,
  u.state,
  u.city,
  l.name AS language,
  ul.proficient_level
FROM 
  users AS u,
  users_languages AS ul,
  languages AS l
WHERE
  u.is_active = TRUE AND
  u.user_id = ul.user_id AND
  ul.language_id = l.language_id;

[
  {
    "name": "Alejandro"
  },
  {
    "name": "Pablo"
  }
]

name: [
  "Alejandro", "Pablo"
]

-- Este query es para obtener usuarios con n carreras especificas

WITH CarrerasUsuarios AS (
  SELECT user_id
  FROM users_ustudies
  WHERE ucareer_id IN (1, 5) 
  AND user_id IN (10)
  GROUP BY user_id
  HAVING COUNT(DISTINCT ucareer_id) = 2
)

SELECT cu.user_id
FROM CarrerasUsuarios cu
JOIN users u ON cu.user_id = u.user_id;

-- Este query es para obtener usuarios con n idiomas especificos
WITH UsuariosConIdiomas AS (
  SELECT user_id
  FROM users_languages
  WHERE language_id IN (1, 2) 
  GROUP BY user_id
  HAVING COUNT(DISTINCT language_id) = 2 
)

SELECT uc.user_id
FROM UsuariosConIdiomas uc
JOIN users u ON uc.user_id = u.user_id;

-- Este query es para obtener usuarios con n habilidades especificas
WITH UsuariosConHabilidades AS (
  SELECT user_id
  FROM users_hard_skills
  WHERE hard_skill_id IN (1, 9) 
  GROUP BY user_id
  HAVING COUNT(DISTINCT hard_skill_id) = 2 
)

SELECT uch.user_id
FROM UsuariosConHabilidades uch
JOIN users u ON uch.user_id = u.user_id;

-- Este query es para obtener usuarios con n habilidades blandas especificas
WITH UsuariosConHabilidadesBlandas AS (
  SELECT user_id
  FROM users_soft_skills
  WHERE soft_skill_id IN (11, 12) 
  GROUP BY user_id
  HAVING COUNT(DISTINCT soft_skill_id) = 2 
)

SELECT uchb.user_id
FROM UsuariosConHabilidadesBlandas uchb
JOIN users u ON uchb.user_id = u.user_id;


-- Este query es para obtener usuarios con n niveles de competencia de idioma especificos
WITH UsuariosConNiveles AS (
  SELECT user_id
  FROM users_languages
  WHERE proficient_level IN ('Native', 'A1') 
  GROUP BY user_id
  HAVING COUNT(DISTINCT proficient_level) = 2
)

SELECT ucn.user_id
FROM UsuariosConNiveles ucn
JOIN users u ON ucn.user_id = u.user_id;

