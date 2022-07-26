import type { GetStaticProps } from 'next'
import Layout from '@/global/layout'
import style from '@/styles/page/home.module.scss'
import BlogInfo from '@/components/blog-info'
import { genNotesList, getClasstifyList } from '~/lib/api'

type HomeProps = {
  posts: [string, PostInfoModel][]
  classtify: [string, string[]][]
}

export default function Home({ posts = [], classtify = [] }: HomeProps) {
  return (
    <>
      <Layout classtify={classtify}>
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

  return {
    props: { posts, classtify }
  }
}
