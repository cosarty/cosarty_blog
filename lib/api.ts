import { readdirSync } from 'fs'
import { NOTES_PATH } from '@/constants'


let metaList: Map<string, PostInfoModel> = new Map()
let classtify: Map<string, string[]> = new Map()
let tags: Map<string, string[]> = new Map()


export const genNotesList = async () => {
  const notesList = readdirSync(NOTES_PATH)
  for (const note of notesList) {
    const noteKey = note.replace('.mdx', '')
    const { meta } = await import(`~/posts/notes/${note}`)
    metaList.set(noteKey, meta)
  }
  return [...metaList]
}

export const getClasstifyList = async () => {

  if (classtify.size) return [...classtify]

  if (!metaList.size) { await genNotesList() }
  for (const [k, v] of metaList) {
    const cur = classtify.get(v.classtify)
    if (Array.isArray(cur)) {
      classtify.set(v.classtify, [...cur, k])

    } else {
      classtify.set(v.classtify, [k])
    }
  }

  return [...classtify];
}

export const getTagsList = async () => {
  if (tags.size) return [...tags]
  if (!metaList.size) { await genNotesList() }
  for (const [k, v] of metaList) {
    for (const key of v.tag!) {
      const cur = tags.get(key)
      if (Array.isArray(cur)) {
        tags.set(key, [...cur, k])
      } else {
        tags.set(key, [k])
      }
    }

  }
  return [...tags];
}

export const getClassKey = async () => [...classtify.keys()]
export const getTagsKey = async () => [...tags.keys()]
export const getNotesKey = async () => [...metaList.keys()]
export const checkNotesKey = async (key: string) => (await getNotesKey()).includes(key)
export const checkClasskey = async (key: string) => (await getClassKey()).includes(key)
export const checkTag = async (key: string) => (await getTagsKey()).includes(key)

export const getNoteMeta = (key: string) => metaList.get(key)

// 获取指定分类的文章
export const getClassNotes = async (key: string) => [...metaList].filter(([n]) => classtify.get(key)?.includes(n))

export const gettagNotes = async (key: string) => [...tags].filter(([n]) => tags.get(key)?.includes(n))




