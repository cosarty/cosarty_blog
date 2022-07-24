import Link from 'next/link'
import { FC } from 'react'
import style from './blog-info.module.scss'

const BlogInfo: FC<{ postInfo: PostInfoModel; src: string }> = ({ postInfo, src }) => {
  const { previewImg, description, title, date, classtify, author } = postInfo
  return (
    <Link href={{ pathname: '/blog/[slug]', query: { slug: src } }}>
      <div className={style['blog-item']}>
        <div className={style['draw']}>
          <img src={previewImg} />
        </div>
        <div className={style['content']}>
          <h2>{title}</h2>
          <div className={style['post-meta-date']}>
            <span>{date}</span>
            <span>{classtify}</span>
            <span>{author}</span>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default BlogInfo
