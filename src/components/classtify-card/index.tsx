import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import style from './classtify-card.module.scss'
const ClasstifyCard: FC<{ classtify?: [string, string[]][] }> = ({ classtify }) => {
  console.log('classtify: ', classtify)
  const router = useRouter()
  return (
    <>
      <div className={style['category-wrapper']}>
        <h3>分类</h3>
        <ul className={style['category-box']}>
          {classtify?.map(([name, post]) => (
            <li
              key={name}
              className={style['category-item']}
              onClick={() => {
                router.push({ pathname: '/category/[classtify]', query: { slug: 'name' } })
              }}
            >
              <span className={style['category-name']}>{name}</span>
              <span className={style['post-num']}>{post.length}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ClasstifyCard
