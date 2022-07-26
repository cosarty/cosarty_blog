import { useRouter } from 'next/router'
import { FC } from 'react'
import style from './tags-card.module.scss'
const TagsCard: FC<{ tags?: [string, string[]][]; current?: string }> = ({ tags, current }) => {
  const router = useRouter()
  console.log('tags: ', tags)
  return (
    <>
      <div className={style['tags-wrapper']}>
        <ul className={style['tags-box']}>
          {tags?.map(([name, post]) => (
            <li
              key={name}
              className={`${style['tags-item']} ${current === name ? style['tags-active'] : ''}`}
              onClick={() => {
                router.push({ pathname: '/tags/[tag]', query: { tag: name } }, undefined)
              }}
            >
              <span className={style['tags-name']}>{name}</span>

              <span className={style['post-num']}>{post.length}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default TagsCard
