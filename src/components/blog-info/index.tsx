import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import style from './blog-info.module.scss'
import { useImge } from '@/utils/hooks'

const BlogInfo: FC<{ postInfo: PostInfoModel; src: string }> = ({ postInfo, src }) => {
  const { previewImg, description, title, date, classtify, author } = postInfo
  const imgSrc = useImge(`blog/${previewImg}`)
  return (
    <Link href={{ pathname: '/blog/[slug]', query: { slug: src } }}>
      <div className={style['blog-item']}>
        <div className={style['draw']}>
          <img src={imgSrc} alt="错误" />
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
