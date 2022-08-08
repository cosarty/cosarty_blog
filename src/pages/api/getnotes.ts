import { NextApiRequest, NextApiResponse } from 'next'
import { genNotesList } from '~/lib/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { pid } = req.query
  const notes = await genNotesList()
  res.status(200).send(notes)
}