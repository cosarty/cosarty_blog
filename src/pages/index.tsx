import type { GetStaticProps } from 'next'
import Layout from '@/global/layout'
import style from '@/styles/page/home.module.scss'
import BlogInfo from '@/components/blog-info'
import { genNotesList, getClasstifyList, getTagsList } from '~/lib/api'
import { len } from '@/utils'
import { useEffect } from 'react'

type HomeProps = MetaInfoType & {
  changeCount: (state: noteNumType) => void
}

export default function Home({ posts = [], classtify = [], tags = [], changeCount }: HomeProps) {
  const count = {
    notes_count: len(posts),
    classtify_count: len(classtify),
    tag_count: len(tags)
  }
  useEffect(() => {
    changeCount(count)
  }, [count])
  return (
    <>
      <Layout classtify={classtify} tags={tags} count={count}>
        <div className={style['abstract-wrapper']}>
          {posts.map(([filename, meta], i) => (
            <BlogInfo key={i} postInfo={meta} src={filename} />
          ))}
        </div>
        {/* 这个留给分页组件 */}
        {/* <div className='pagation pagation'></div> */}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await genNotesList()
  const classtify = await getClasstifyList()
  const tags = await getTagsList()

  return {
    props: { posts, classtify, tags }
  }
}
