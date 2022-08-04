import type { GetStaticProps } from 'next'
import Layout from '@/global/layout'
import style from '@/styles/page/archives.module.scss'
import { genNotesList, getClasstifyList, getTagsList } from '~/lib/api'
import { len, parseDate } from '@/utils'
type HomeProps = {
  posts: [string, PostInfoModel][]
  classtify: [string, string[]][]
  tags: [string, string[]][]
}

const Archives = ({ posts = [], classtify = [], tags = [] }: HomeProps) => {
  return (
    <>
      <Layout classtify={classtify} tags={tags}>
        <div className={style['archives-wrapper']}>
          <div className={style['notes-sort-title']}>
            <h2>文章总览-{len(posts)}</h2>
          </div>
          <div className={style['notes-sort']}>
            <div className={style['notes-sort-item-title']}></div>
            <div className={style['notes-sort-item']}>1</div>
          </div>
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

export default Archives
