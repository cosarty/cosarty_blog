import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './classtify-card.module.scss'
const ClasstifyCard = () => {
  const router = useRouter()
  return (
    <>
      <div className={style['category-wrapper']}>
        <h3>分类</h3>
        <ul className={style['category-box']}>
          <li
            className={style['category-item']}
            onClick={() => {
              router.push({ pathname: '/blog/[slug]', query: { slug: '2022072401' } })
            }}
          >
            <span className={style['category-name']}>前端</span>
            <span className={style['post-num']}>10</span>
          </li>
          <li className={style['category-item']}>
            <Link href="/ds">
              <>
                <span className={style['category-name']}>后端</span>
                <span className={style['post-num']}>9</span>
              </>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ClasstifyCard
