import { NOTES_PATH } from '@/constants'
import { readdirSync } from 'fs-extra'
import { join } from 'path'

class CxnBlogMeta {
  private classtify: Set<string> = new Set<string>()
  tags: Set<string> = new Set<string>(['dsa'])
  private metaList: Map<string, PostInfoModel> = new Map()

  constructor() {

    this.genMetaList()
  }


  private async genMetaList() {
    const notesList = readdirSync(NOTES_PATH)
    for (const note of notesList) {
      console.log('note: ', note);
      const noteName = note.replace('.mdx', '')


      console.log('meta: ', import('~posts/notes/2022072401.mdx'));
    }
  }


  private genClasstify() {

  }
  private genTags() {

  }

  getClasstify(className?: string) {
    if (!className) return this.classtify

  }
  getTags(tagNames?: string) {
    if (!tagNames) return this.tags
  }
}


export default new CxnBlogMeta()