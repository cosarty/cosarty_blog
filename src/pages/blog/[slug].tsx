import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getNotesKey, checkNotesKey, getNoteMeta, genNotesList, getClasstifyList, getTagsList } from '~/lib/api'
import MdxWidget from '@/components/mdx-widget'
import Layout from '@/global/layout'
import style from '@/styles/page/blog.module.scss'
import SvgGo from '@/components/svg-go'
import { len } from '@/utils'

const DynamicComponent = (key: string) => dynamic(() => import(`~/posts/notes/${key}.mdx`))

type BlogPostProps = MetaInfoType & {
  meta: PostInfoModel
  changeCount: (state: noteNumType) => void
}

const BlogPost: FC<BlogPostProps> = ({ meta, posts, classtify, tags, changeCount }) => {
  const router = useRouter()
  const [currentHash, setCurrentHash] = useState('')
  const [menu, setMenu] = useState<TitleDepType[]>([])
  const count: noteNumType = {
    notes_count: len(posts),
    classtify_count: len(classtify),
    tag_count: len(tags)
  }
  useEffect(() => {
    changeCount(count)
  }, [posts])
  // 动态获取文章
  const Blog = DynamicComponent(router.query.slug as string)

  const { title, tag, author, date } = meta

  const hashChangeHendle = () => {
    const hash = decodeURIComponent(location.hash.replace(/[\s\S]+(?=#)/, ''))
    setCurrentHash(hash)
  }

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHendle)
    // tslint:disable-next-line: align
    ;(async () => {
      const res = await fetch(window.location.origin + `/api/getmenu/${router.query.slug}`)
      const menu = (await res.json()) as TitleDepType[]
      setMenu(menu)
    })()

    return () => {
      window.removeEventListener('hashchange', hashChangeHendle)
    }
  }, [])

  // 渲染目录
  const Catalog = (menuDep: TitleDepType[]) => {
    return (
      menuDep.length > 0 && (
        <ol>
          {menuDep.map((m, idx) => (
            <li key={idx}>
              <>
                <a
                  className={`${currentHash === `#${m.title}` ? style['active'] : ''}`}
                  href={`#${m.title}`}
                  // style={{
                  //   color: currentHash === `#${m.title}` || !currentHash ? 'red' : 'green'
                  // }}
                >
                  {m.title}
                </a>
                {Catalog(m.sub)}
              </>
            </li>
          ))}
        </ol>
      )
    )
  }

  return (
    <>
      <Layout
        heroSrc={`blog/${meta.previewImg}`}
        topHeight={55}
        topfixed={false}
        isPosts
        showContent={false}
        count={count}
        // 渲染目录
        postCustom={() => <div className={style['catalog-box']}>{Catalog(menu)}</div>}
      >
        <>
          <div className={style['notes-wrapper']}>
            <div className={style.content}>
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
  if (!(await checkNotesKey(params.slug))) {
    return { notFound: true }
  }
  const classtify = await getClasstifyList()
  const tags = await getTagsList()
  return {
    props: { meta: getNoteMeta(params.slug), posts, classtify, tags }
  }
}

export default BlogPost
