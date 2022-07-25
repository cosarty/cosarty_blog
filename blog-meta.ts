import { NOTES_PATH } from '@/constants'
import { readdirSync } from 'fs-extra'


class CxnBlogMeta {
  private classtify: Set<string> = new Set<string>()
  private tags: Set<string> = new Set<string>(['dsa'])
  private metaList: Map<string, PostInfoModel> = new Map()

  constructor() {
    this.genMetaList()
  }
  private async genMetaList() {
    const notesList = readdirSync(NOTES_PATH)
    for (const note of notesList) {
      const noteKey = note.replace('.mdx', '')
      const { meta } = await import(`~posts/notes/${note}`)

      this.metaList.set(noteKey, meta)
    }
    this.genTags()
    this.genClasstify()
  }


  private async genClasstify() {
    for (const [, v] of this.metaList) {
      this.classtify.add(v.classtify)
    }
  }

  private genTags() {
    for (const [, v] of this.metaList) {
      v.tag?.map(i => this.tags.add(i))
    }
  }

  get getClasstify() {
    return this.classtify
  }
  get getMetaList() {
    return this.metaList
  }
  get getTags() {
    return this.tags
  }
}


export default new CxnBlogMeta()