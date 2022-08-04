import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { getNotesKey, checkNotesKey, getNoteMeta, genNotesList, getClasstifyList, getTagsList } from '~/lib/api'
import MdxWidget from '@/components/mdx-widget'
import Layout from '@/global/layout'
import style from '@/styles/page/blog.module.scss'
import SvgGo from '@/components/svg-go'
import { len } from '@/utils'

const DynamicComponent = (key: string) => dynamic(() => import(`~/posts/notes/${key}.mdx`))

interface BlogPostProps {
  meta: PostInfoModel
  posts: [string, PostInfoModel][]
  classtify: [string, string[]][]
  tags: [string, string[]][]
}

const BlogPost: FC<BlogPostProps> = ({ meta, posts, classtify, tags }) => {
  const { query } = useRouter()
  const count = {
    notes_count: len(posts),
    classtify_count: len(classtify),
    tag_count: len(tags)
  }
  const Blog = DynamicComponent(query.slug as string)
  const { title, tag, author, date } = meta
  return (
    <>
      <Layout
        heroSrc={`blog/${meta.previewImg}`}
        topHeight={55}
        topfixed={false}
        isPosts
        showContent={false}
        count={count}
      >
        <>
          <div className={style['notes-wrapper']}>
            <div className={style['content']}>
              <h2>{title}</h2>
              <hr />
              <div className={style['post-meta']}>
                <span>
                  <SvgGo icon="gerenzhongxin" style={{ width: '1.3rem', height: '1.3rem' }} />
                  {author}
                </span>
                <span>
                  <SvgGo icon="rili" style={{ width: '1.3rem', height: '1.3rem' }} />
                  {date}
                </span>
                <span>
                  <SvgGo icon="biaoqian1" style={{ width: '1.3rem', height: '1.3rem' }} />
                  {tag?.join(',')}
                </span>
              </div>
            </div>

            {/*  @ts-ignore */}
            <Blog components={MdxWidget}></Blog>
          </div>
        </>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  await genNotesList()
  const paths = (await getNotesKey()).map((key) => ({ params: { slug: key } }))
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const posts = await genNotesList()
  if (!(await checkNotesKey(params.slug))) return { notFound: true }
  const classtify = await getClasstifyList()
  const tags = await getTagsList()
  return {
    props: { meta: getNoteMeta(params.slug), posts, classtify, tags }
  }
}

export default BlogPost
