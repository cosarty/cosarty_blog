import type { GetStaticProps } from 'next'
import HeroBg from '@/components/hero-bg'
import style from '@/styles/page/home.module.scss'
import BlogInfo, { type PostInfoModel } from '@/components/blog-info'
import AuthorCard from '@/components/author-card'
// import Home from './home'
// import dynamic from 'next/dynamic'
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

export default function Home({ posts }: HomeProps) {
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
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: [
        {
          previewImg: '/blog/1.png', // 预览图
          description: '测试的', // 描述
          date: '2022-05-06', // 日期
          author: 'cxn', // 作者
          classtify: '前端',
          name: 'hhhhh' // 分类
        },
        {
          previewImg: '/blog/1.png',
          description:
            '返回的数据库量福达合金SDK了丰厚的就开始放接口的书法家肯定是分开的健身房金卡戴珊复健科的说法就开始放肯定会是开放',
          date: '2022-05-06',
          author: 'cxn',
          classtify: '后端',
          name: 'hhh'
        }
      ]
    }
  }
}
