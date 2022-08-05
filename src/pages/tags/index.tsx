import style from '@/styles/page/tags.module.scss'
import { genNotesList, getTagsList } from '~/lib/api'
import { FC } from 'react'
import BlogInfo from '@/components/blog-info'
import TagsCard from '@/components/tags-card'

type CategoryProps = Omit<MetaInfoType, 'classtify'>

const Tags: FC<CategoryProps> = ({ tags = [], posts }) => {
  return (
    <>
      <div className={style['tags-weapper']}>
        <div className={style['tags-top']}>
          <TagsCard tags={tags} />
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
  const tags = await getTagsList()

  return {
    props: { posts, tags }
  }
}

export default Tags
