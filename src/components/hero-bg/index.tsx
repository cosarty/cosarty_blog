import style from './hero-bg.module.scss'
import { FC } from 'react'
import { useImge } from '@/utils/hooks'

const HeroBg: FC<{ src?: string; topheight?: number; topfixed?: boolean }> = ({
  src = '',
  topheight = 95,
  topfixed = true
}) => {
  const imgSrc = useImge(src)

  return (
    <div
      className={style['hero']}
      style={{
        backgroundImage: `url(${imgSrc})`,
        height: `${topheight}vh`,
        backgroundAttachment: `${topfixed ? 'fixed' : 'scroll'}`
      }}
    >
      <div className={style['motto']}>
        <h1>一个正在学走路的小萌新</h1>
        <p>愿世界上每一个人都可以找到自己所爱、所喜欢、所向往、所值得付出的人与物</p>
      </div>
    </div>
  )
}

export default HeroBg
