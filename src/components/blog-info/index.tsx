import Link from 'next/link'
import { FC } from 'react'
import style from './blog-info.module.scss'
import { useImge } from '@/utils/hooks'
import SvgGo from '../svg-go'

const BlogInfo: FC<{ postInfo: PostInfoModel; src: string }> = ({ postInfo, src }) => {
  const { previewImg, description, title, date, tag, author } = postInfo

  const imgSrc = useImge(`blog/${previewImg}`)

  return (
    <Link href={{ pathname: '/blog/[slug]', query: { slug: src } }}>
      <div className={style['blog-item']}>
        <div className={style['draw']}>
          <img src={imgSrc} alt="错误" />
        </div>
        <div className={style['content']}>
          <h2>{title}</h2>
          <div className={style['post-meta']}>
            <span>
              <SvgGo icon="rili" style={{ width: '1.3rem', height: '1.3rem' }} />
              {date}
            </span>
            <span>
              <SvgGo icon="biaoqian1" style={{ width: '1.3rem', height: '1.3rem' }} />
              {tag?.join(',')}
            </span>
            <span>
              <SvgGo icon="gerenzhongxin" style={{ width: '1.3rem', height: '1.3rem' }} />
              {author}
            </span>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default BlogInfo
