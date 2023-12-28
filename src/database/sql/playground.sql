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