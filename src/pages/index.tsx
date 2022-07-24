import type { GetStaticProps } from 'next'
import HeroBg from '@/components/hero-bg'
import style from '@/styles/page/home.module.scss'
import BlogInfo from '@/components/blog-info'
import AuthorCard from '@/components/author-card'
import { genNotesList } from '~lib/api'
// import Test from '~/posts/notes/2022072401.mdx'

// import Home from './home'

// import CodeBlock from './notes/CodeBlock'

// const DynamicComponent = dynamic(() => import('@/pages/notes/test.mdx'))

// const components = {
//   pre: CodeBlock,
//   code:(props)=><b {...props} style={{fontSize:'30px'}}></b>
// }

// return (
//   <DynamicComponent components={components}></DynamicComponent>
// )

type HomeProps = {
  posts: PostInfoModel[]
}

export default function Home({ posts = [] }: HomeProps) {
  console.log(posts)

  return (
    <>
      <HeroBg />
      <div className={style['home-blog-wrapper']}>
        <div className={style['blog-list']}>
          <div className={style['abstract-wrapper']}>
            {posts.map((postInfo, i) => (
              <BlogInfo key={i} postInfo={postInfo} />
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
  await genNotesList()
  return {
    props: {}
  }
}
