import style from '@/styles/page/tags.module.scss'
import { checkTag, getClassNotes, getTagNotes, getTagsKey, getTagsList } from '~/lib/api'
import { FC } from 'react'
import BlogInfo from '@/components/blog-info'
import { useRouter } from 'next/router'
import TagsCard from '@/components/tags-card'

type TagProps = Omit<MetaInfoType, 'classtify'>

const Tag: FC<TagProps> = ({ tags = [], posts }) => {
  const { query } = useRouter()
  return (
    <>
      <div className={style['tags-weapper']}>
        <div className={style['tags-top']}>
          <TagsCard tags={tags} current={query.tag as string} />
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

export const getStaticPaths = async () => {
  await getTagsList()
  const paths = (await getTagsKey()).map((key: string) => ({ params: { tag: key } }))

  return {
    paths,
    fallback: false
  }
}
export const getStaticProps = async ({ params }: any) => {
  const tags = await getTagsList()
  if (!(await checkTag(params.tag))) return { notFound: true }
  return {
    props: { posts: await getTagNotes(params.tag), tags }
  }
}

export default Tag
