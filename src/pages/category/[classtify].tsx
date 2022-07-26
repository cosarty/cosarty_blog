import style from '@/styles/page/category.module.scss'
import ClasstifyCard from '@/components/classtify-card'
import { checkClasskey, genNotesList, getClassKey, getClassNotes, getClasstifyList } from '~/lib/api'
import { FC } from 'react'
import BlogInfo from '@/components/blog-info'
import { useRouter } from 'next/router'

type ClasstifyProps = {
  posts: [string, PostInfoModel][]
  classtify: [string, string[]][]
}

const Classtify: FC<ClasstifyProps> = ({ classtify = [], posts }) => {
  const { query } = useRouter()
  console.log('query: ', query)
  return (
    <>
      <div className={style['category-weapper']}>
        <div className={style['category-top']}>
          <ClasstifyCard classtify={classtify} direction="row"></ClasstifyCard>
        </div>
        <div>
          {posts.map(([filename, meta], i) => (
            <BlogInfo key={i} postInfo={meta} src={filename} />
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = (await getClassKey()).map((key: string) => ({ params: { classtify: key } }))

  return {
    paths,
    fallback: false
  }
}
export const getStaticProps = async ({ params }: any) => {
  console.log('await check: ', await checkClasskey(params.classtify))
  if (!(await checkClasskey(params.classtify))) return { notFound: true }

  return {
    props: { posts: await getClassNotes(params.classtify), classtify: await getClassKey() }
  }
}

export default Classtify
