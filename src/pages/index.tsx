import type { GetStaticProps } from 'next'
import HeroBg from '@/components/hero-bg'
import style from '@/styles/page/home.module.scss'
import BlogInfo from '@/components/blog-info'
import AuthorCard from '@/components/author-card'
import { genNotesList } from '~lib/api'

type HomeProps = {
  posts: [string, PostInfoModel][]
}

export default function Home({ posts = [] }: HomeProps) {
  return (
    <>
      <HeroBg />
      <div className={style['home-blog-wrapper']}>
        <div className={style['blog-list']}>
          <div className={style['abstract-wrapper']}>
            {posts.map(([filename, meta], i) => (
              <BlogInfo key={i} postInfo={meta} src={filename} />
            ))}
          </div>
          {/* 这个留给分页组件 */}
          {/* <div className='pagation pagation'></div> */}
        </div>
        <div className={style['info-wrapper']}>
          <AuthorCard />
          <hr />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await genNotesList()

  return {
    props: { posts }
  }
}
