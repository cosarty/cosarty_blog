import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { getNotesKey, checkNotesKey, getNoteMeta } from '~lib/api'
import MdxWidget from '@/components/mdx-widget'
const DynamicComponent = (key: string) => dynamic(() => import(`~posts/notes/${key}.mdx`))

interface BlogPostProps {
  meta: PostInfoModel
}

const BlogPost: FC<BlogPostProps> = ({ meta }) => {
  console.log('meta: ', meta)
  const { query } = useRouter()

  const Blog = DynamicComponent(query.slug as string)
  return (
    <>
      <Blog components={MdxWidget}></Blog>{' '}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getNotesKey()).map((key) => ({ params: { slug: key } }))
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  if (!(await checkNotesKey(params.slug))) return { notFound: true }
  console.log('params.slug: ', params.slug)
  return {
    props: { meta: getNoteMeta(params.slug) }
  }
}

export default BlogPost
