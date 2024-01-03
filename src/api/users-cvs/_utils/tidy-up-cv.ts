import { pool } from '../../../database'

export async function tidyUpCV (cvId: number): Promise<void> {
  void pool.query({
    text: `
      DELETE FROM cv_languages
      WHERE cv_id = $1
    `,
    values: [cvId]
  })

  void pool.query({
    text: `
      DELETE FROM cv_ustudies
      WHERE cv_id = $1
    `,
    values: [cvId]
  })

  void pool.query({
    text: `
      DELETE FROM cv_foreign_studies
      WHERE cv_id = $1
    `,
    values: [cvId]
  })

  void pool.query({
    text: `
      DELETE FROM cv_work_experiences
      WHERE cv_id = $1
    `,
    values: [cvId]
  })

  void pool.query({
    text: `
      DELETE FROM cv_hard_skills
      WHERE cv_id = $1
    `,
    values: [cvId]
  })

  void pool.query({
    text: `
      DELETE FROM cv_personal_hard_skills
      WHERE cv_id = $1
    `,
    values: [cvId]
  })

  void pool.query({
    text: `
      DELETE FROM cv_soft_skills
      WHERE cv_id = $1
    `,
    values: [cvId]
  })

  void pool.query({
    text: `
      DELETE FROM cv_personal_soft_skills
      WHERE cv_id = $1
    `,
    values: [cvId]
  })
}
