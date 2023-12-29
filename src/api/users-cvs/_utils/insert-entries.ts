import { pool } from '../../../database'
import { Entries } from '../user-cvs.schema'
import { getHSOccurrencesArrays } from './get-hs-occurrences-arrays'
import { getSSOccurrencesArrays } from './get-ss-occurrences-arrays'

export async function insertEntries (userId: number, cvId: number, entries: Entries): Promise<void> {
  for (let index = 0; index < entries.languages.length; index++) {
    await pool.query({
      text: `
        INSERT INTO cv_languages (
          user_id,
          cv_id,
          language_id,
          order_index
        ) VALUES ($1, $2, $3, $4)
      `,
      values: [userId, cvId, entries.languages[index], index]
    })
  }

  for (const featured of entries.education.featured) {
    await pool.query({
      text: `
        INSERT INTO cv_ustudies (
          user_id,
          cv_id,
          ucareer_id
        ) VALUES ($1, $2, $3)
      `,
      values: [userId, cvId, featured]
    })
  }

  for (const personal of entries.education.personal) {
    await pool.query({
      text: `
        INSERT INTO cv_foreign_studies (
          user_id,
          cv_id,
          foreign_study_id
        ) VALUES ($1, $2, $3)
      `,
      values: [userId, cvId, personal]
    })
  }

  for (const experience of entries.experience) {
    await pool.query({
      text: `
        INSERT INTO cv_work_experiences (
          user_id,
          cv_id,
          work_exp_id
        ) VALUES ($1, $2, $3)
      `,
      values: [userId, cvId, experience]
    })
  }

  const hardSkillsArrays = await getHSOccurrencesArrays(userId, entries.skills.hard)

  for (const skill of hardSkillsArrays.featured) {
    await pool.query({
      text: `
        INSERT INTO cv_hard_skills (
          user_id,
          cv_id,
          hard_skill_id,
          order_index
        ) VALUES ($1, $2, $3, $4)
      `,
      values: [userId, cvId, skill.id, skill.index]
    })
  }

  for (const skill of hardSkillsArrays.personal) {
    await pool.query({
      text: `
        INSERT INTO cv_personal_hard_skills (
          user_id,
          cv_id,
          phard_skill_id,
          order_index
        ) VALUES ($1, $2, $3, $4)
      `,
      values: [userId, cvId, skill.id, skill.index]
    })
  }

  const softSkillsArrays = await getSSOccurrencesArrays(userId, entries.skills.soft)

  for (const skill of softSkillsArrays.featured) {
    await pool.query({
      text: `
        INSERT INTO cv_soft_skills (
          user_id,
          cv_id,
          soft_skill_id,
          order_index
        ) VALUES ($1, $2, $3, $4)
      `,
      values: [userId, cvId, skill.id, skill.index]
    })
  }
  for (const skill of softSkillsArrays.personal) {
    await pool.query({
      text: `
        INSERT INTO cv_personal_soft_skills (
          user_id,
          cv_id,
          psoft_skill_id,
          order_index
        ) VALUES ($1, $2, $3, $4)
      `,
      values: [userId, cvId, skill.id, skill.index]
    })
  }
}
