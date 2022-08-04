import style from './author-card.module.scss'
import Avartar from '@/assets/caos_avatar.jpg'
import Image from 'next/image'
import SvgGo from '../svg-go'

const AuthorCard = () => {
  return (
    <div className={style['author-card']}>
      <div className={style['personal-info-wrapper']}>
        <Image src={Avartar} width={100} height={100} alt="头像" />
        <h3 className={style['name']}>蔡夏柠</h3>
        <p className={style['desc']}>hhhhhhhh</p>
        <button>
          <SvgGo
            icon="github"
            style={{ width: '1.4rem', height: '1.4rem', verticalAlign: 'bottom', marginRight: '5px' }}
          />
          Follow Me
        </button>
        <div className={style['num']}>
          <div>
            <h3>142</h3>
            <h6>文章</h6>
          </div>
          <div>
            <h3>10</h3>
            <h6>分类</h6>
          </div>
          <div>
            <h3>98</h3>
            <h6>标签</h6>
          </div>
        </div>
        <ul className={style['social-links']}>
          <li className={style['social-item']}>
            <SvgGo icon="weixin" />
          </li>
          <li className={style['social-item']}>
            <SvgGo icon="github2" />
          </li>
          <li className={style['social-item']}>
            <SvgGo icon="mail" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AuthorCard
