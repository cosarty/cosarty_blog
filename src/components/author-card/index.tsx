import style from './author-card.module.scss'
import Avartar from '@/assets/caos_avatar.jpg'
import Image from 'next/image'

const AuthorCard = () => {
  return (
    <div className={style['author-card']}>
      <div className={style['personal-info-wrapper']}>
        <Image src={Avartar} width={150} height={150} />
      </div>
    </div>
  )
}

export default AuthorCard
