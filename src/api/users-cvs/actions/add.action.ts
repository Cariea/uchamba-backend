import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
// import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { Entries } from '../user-cvs.schema'

export const addUserCV = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { careerId, name, entries } = req.body
    // const userId: number = req.user.id

    // await pool.query({
    //   text: `
    //     INSERT INTO users_cvs (
    //       user_id,
    //       ucareer_id,
    //       name
    //     ) VALUES ($1, $2, $3)
    //   `,
    //   values: [userId, careerId, name]
    // })

    console.log('Carrera: ', careerId, 'Nombre: ', name, 'Entries: ', entries)

    await insertEntries(entries)

    return res.status(STATUS.CREATED).json({ message: 'Curriculum Vitae creado correctamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

async function insertEntries (entries: Entries): Promise<void> {
  for (const language of entries.languages) {
    console.log(language)
  }
  for (const education in entries.education) {
    console.log(education)
  }
  for (const experience of entries.experience) {
    console.log(experience)
  }
  for (const skill in entries.skills) {
    console.log(skill)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
