declare type PostInfoModel = {
  previewImg: string
  description: string
  date: string
  author: string
  classtify: string
  title: string
  tag?: string[]
}


declare type noteNumType =
  { notes_count: number; classtify_count: number; tag_count: number }
