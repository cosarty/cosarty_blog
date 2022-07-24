import BlogMeta from '~blog-meta'



export const genNotesList = async () => {
  return [...BlogMeta.getMetaList]
}


export const getNotesKey = async () => {
  return [...BlogMeta.getMetaList.keys()]
}


export const checkNotesKey = async (key: string) => (await getNotesKey()).includes(key)

export const getNoteMeta = (key: string) => BlogMeta.getMetaList.get(key)