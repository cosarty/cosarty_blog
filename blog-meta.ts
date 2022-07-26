import { NOTES_PATH } from '@/constants'
import { readdirSync } from 'fs-extra'
let sl: CxnBlogMeta

class CxnBlogMeta {
  classtify: Map<string, string[]> = new Map()
  private tags: Map<string, string[]> = new Map()
  private metaList: Map<string, PostInfoModel> = new Map()

  constructor() {
    this.genMetaList()
    console.log(1)
  }
  private async genMetaList() {
    const notesList = readdirSync(NOTES_PATH)
    for (const note of notesList) {
      const noteKey = note.replace('.mdx', '')
      console.log('noteKey: ', noteKey);
      const { meta } = await import(`~/posts/notes/${note}`)
      this.metaList.set(noteKey, meta)
    }
    await this.genTags()
    await this.genClasstify()
  }


  private async genClasstify() {
    for (const [k, v] of this.metaList) {
      const cur = this.classtify.get(v.classtify)
      if (Array.isArray(cur)) {
        this.classtify.set(v.classtify, [...cur, k])

      } else {
        this.classtify.set(v.classtify, [k])
      }
    }
  }

  private genTags() {
    for (const [k, v] of this.metaList) {
      for (const key of v.tag!) {
        const cur = this.classtify.get(key)
        if (Array.isArray(cur)) {
          this.tags.set(key, [...cur, k])
        } else {
          this.tags.set(key, [k])
        }
      }

    }
  }

  get getMetaList() {
    return this.metaList
  }
  get getTags() {
    return this.tags
  }
}

sl = new CxnBlogMeta()
export default sl