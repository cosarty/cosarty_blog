import style from '@/styles/page/category.module.scss'
import ClasstifyCard from '@/components/classtify-card'
import { genNotesList, getClasstifyList } from '~/lib/api'
import { FC } from 'react'
import BlogInfo from '@/components/blog-info'

type CategoryProps = {
  posts: [string, PostInfoModel][]
  classtify: [string, string[]][]
}

const Category: FC<CategoryProps> = ({ classtify = [], posts }) => {
  return (
    <>
      <div className={style['category-weapper']}>
        <div className={style['category-top']}>
          <ClasstifyCard classtify={classtify} direction="row"></ClasstifyCard>
        </div>
        <div>
          {posts.map(([filename, meta], i) => (
            <BlogInfo key={i} postInfo={meta} src={filename} />
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await genNotesList()
  const classtify = await getClasstifyList()

  return {
    props: { posts, classtify }
  }
}

export default Category
