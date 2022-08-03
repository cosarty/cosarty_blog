import { readdirSync } from 'fs'
import { NOTES_PATH } from '@/constants'
import { len } from '@/utils'
import { extname } from 'path'


let metaList: Record<string, PostInfoModel> = {}
let classtify: Record<string, string[]> = {}
let tags: Record<string, string[]> = {}

const notesSort = (notes: typeof metaList) => Object.entries(notes).sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime())

export const genNotesList = async () => {
  const notesList = readdirSync(NOTES_PATH)
  for (const note of notesList) {
    if (extname(note) !== '.mdx') continue

    const noteKey = note.replace('.mdx', '')
    const { meta } = await import(`~/posts/notes/${note}`)
    metaList[noteKey] = meta
  }

  return notesSort(metaList)
}

export const getClasstifyList = async () => {

  if (len(classtify)) return Object.entries(classtify)

  if (!len(metaList)) { await genNotesList() }
  for (const [k, v] of Object.entries(metaList)) {
    const cur = classtify[v.classtify]
    if (Array.isArray(cur)) {
      classtify[v.classtify] = [...cur, k]

    } else {
      classtify[v.classtify] = [k]
    }
  }

  return Object.entries(classtify);
}

export const getTagsList = async () => {
  if (len(tags)) return Object.entries(tags)
  if (!len(metaList)) { await genNotesList() }
  for (const [k, v] of Object.entries(metaList)) {
    for (const key of v.tag!) {
      const cur = tags[key]
      if (Array.isArray(cur)) {
        tags[key] = [...cur, k]
      } else {
        tags[key] = [k]
      }
    }

  }
  return Object.entries(tags);
}

export const getClassKey = async () => [...Object.keys(classtify)]
export const getTagsKey = async () => [...Object.keys(tags)]
export const getNotesKey = async () => [...Object.keys(metaList)]
export const checkNotesKey = async (key: string) => (await getNotesKey()).includes(key)
export const checkClasskey = async (key: string) => (await getClassKey()).includes(key)
export const checkTag = async (key: string) => (await getTagsKey()).includes(key)

export const getNoteMeta = (key: string) => metaList[key]

// 获取指定分类的文章
export const getClassNotes = async (key: string) => notesSort(metaList).filter(([n]) => classtify[key]?.includes(n))

export const getTagNotes = async (key: string) => notesSort(metaList).filter(([n]) => tags[key]?.includes(n))


