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
        <p>遇见都是天意,拥有都是幸运,世界上的一千种等待,最好的叫做未来可期....</p>
      </div>
    </div>
  )
}

export default HeroBg
