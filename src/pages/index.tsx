import type { GetStaticProps } from 'next'
import Layout from '@/global/layout'
import style from '@/styles/page/home.module.scss'
import BlogInfo from '@/components/blog-info'
import { genNotesList } from '~lib/api'

type HomeProps = {
  posts: [string, PostInfoModel][]
}

export default function Home({ posts = [] }: HomeProps) {
  return (
    <>
      <Layout>
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

  return {
    props: { posts }
  }
}
