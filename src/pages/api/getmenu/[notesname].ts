import { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from 'fs/promises';
import { join } from 'path';


export default async function getmenu(req: NextApiRequest, res: NextApiResponse) {

  /**
   * [{title:'',sub:[{title:'}]}]
   * 目前只做三级目录
   */
  const notesInfo = await readFile(join(process.cwd(), 'posts/notes', `${req.query.notesname}.mdx`), 'utf-8')
  const t = Array.from(notesInfo.matchAll(/#{1,6}(.*?)(?=\r\n)/g), (a => {
    const { groups } = a[0].match(/(?<mold>#{1,6})\s(?<title>[\s\S]+)/)!


    return [groups!.mold, groups!.title]
  }))

  const titleDep = t.reduce((pre, [mold, title]) => {
    if (mold.length === 1) { pre.push({ title, sub: [] }) }
    if (mold.length === 2) { pre.at(-1)!.sub.push({ title, sub: [] }) }
    if (mold.length === 3) { pre.at(-1)!.sub.at(-1)!.sub.push({ title, sub: [] }) }
    return pre
  }, [] as TitleDepType[])

  res.status(200).send(titleDep)
}