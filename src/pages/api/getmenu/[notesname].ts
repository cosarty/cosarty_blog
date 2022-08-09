import { NextApiRequest, NextApiResponse } from 'next'
import { genNotesList } from '~/lib/api'
import { readFile } from 'fs/promises';
import { join } from 'path';
// 
export default async function getmenu(req: NextApiRequest, res: NextApiResponse) {

  console.log(process.cwd())

  const notesInfo = await readFile(join(process.cwd(), 'posts/notes', `${req.query.notesname}.mdx`), 'utf-8')
  console.log(Array.from(notesInfo.matchAll(/#{1,6}(.*?)(?=\r\n)/g), (a => a[0].trim())))
  // const { pid } = req.query
  const notes = await genNotesList()
  res.status(200).send(notes)
}