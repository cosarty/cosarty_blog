import style from './hero-bg.module.scss'
import { FC, useRef } from 'react'
import { useImge } from '@/utils/hooks'
import { useGlobalState } from '@/global/provider'
const HeroBg: FC<{
  src?: string
  topheight?: number
  topfixed?: boolean
  showContent?: boolean
}> = ({ src = '', topheight = 95, topfixed = true, showContent = true }) => {
  const imgSrc = useImge(src)
  const { descript, label } = useGlobalState()
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={heroRef}
      className={style['hero']}
      style={{
        backgroundImage: `url(${imgSrc})`,
        height: `${topheight}vh`,
        backgroundAttachment: `${topfixed ? 'fixed' : 'scroll'}`
      }}
    >
      {showContent && (
        <>
          <div className={style['motto']}>
            <h1>{label}</h1>
            <p>{descript}</p>
          </div>{' '}
          <div
            className={style['downward']}
            onClick={() => {
              // document.body.scrollTo({ top: heroRef.current!.getBoundingClientRect().bottom })
              // getTop(heroRef.current!.getBoundingClientRect().bottom ?? 0)
              document.documentElement.scrollTo({
                top: heroRef.current?.offsetHeight,

                behavior: 'smooth'
              })
            }}
          ></div>
        </>
      )}
    </div>
  )
}

export default HeroBg
