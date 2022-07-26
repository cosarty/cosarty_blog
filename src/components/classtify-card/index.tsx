import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import style from './classtify-card.module.scss'
const ClasstifyCard: FC<{ classtify?: [string, string[]][]; direction?: 'column' | 'row'; current?: string }> = ({
  classtify,
  direction = 'column',
  current
}) => {
  const router = useRouter()
  return (
    <>
      <div className={style['category-wrapper']}>
        <ul className={style['category-box']} style={{ flexDirection: direction }}>
          {classtify?.map(([name, post]) => (
            <li
              key={name}
              className={`${style['category-item']} ${current === name ? style['category-active'] : ''}`}
              onClick={() => {
                router.push({ pathname: '/category/[classtify]', query: { classtify: name } }, undefined)
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
