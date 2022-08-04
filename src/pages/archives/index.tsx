import { Fragment } from 'react'
import type { GetStaticProps } from 'next'
import Layout from '@/global/layout'
import style from '@/styles/page/archives.module.scss'
import { genNotesList, getClasstifyList, getTagsList } from '~/lib/api'
import { len, parseDate } from '@/utils'
import Link from 'next/link'
import { useImge } from '@/utils/hooks'
import SvgGo from '@/components/svg-go'
type HomeProps = {
  posts: [string, PostInfoModel][]
  classtify: [string, string[]][]
  tags: [string, string[]][]
}

const Archives = ({ posts = [], classtify = [], tags = [] }: HomeProps) => {
  const count = {
    notes_count: len(posts),
    classtify_count: len(classtify),
    tag_count: len(tags)
  }
  return (
    <>
      <Layout classtify={classtify} tags={tags} count={count}>
        <div className={style['archives-wrapper']}>
          <div className={style['notes-sort-title']}>
            <h2>文章总览-{len(posts)}</h2>
          </div>
          <div className={style['notes-sort']}>
            {posts.map(([filename, meta], i, p) => {
              const showSubDate = () => {
                // 如果后面设置了分页的话 就直接  i/分页数
                if (!p[i - 1]) {
                  return true
                }
                if (parseDate(p[i][0]).year !== parseDate(p[i - 1][0]).year) {
                  return true
                }
                return false
              }
              return (
                <Fragment key={filename}>
                  {showSubDate() && <div className={style['notes-sort-item-title']}>{parseDate(filename).year}</div>}
                  <Link href={{ pathname: '/blog/[slug]', query: { slug: filename } }}>
                    <div className={style['notes-sort-item']}>
                      <img src={useImge(`blog/${meta.previewImg}`)} />
                      <div className={style['notes-sort-item-meta']}>
                        <div>
                          <SvgGo icon="rili" style={{ width: '1.3rem', height: '1.3rem' }} />
                          {meta.date}
                        </div>
                        <div>{meta.title}</div>
                      </div>
                    </div>
                  </Link>
                </Fragment>
              )
            })}
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
