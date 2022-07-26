import React, { useEffect, useState } from 'react'
import HeroBg from '@/components/hero-bg'
import style from './layout.module.scss'
import AuthorCard from '@/components/author-card'
import { useSize } from '@/utils/hooks'
import ClasstifyCard from '@/components/classtify-card'

interface LayoutIn {
  children: React.ReactElement
  heroSrc?: string
  topHeight?: number
  topfixed?: boolean
  isPosts?: boolean
  classtify?: [string, string[]][]
}

const Layout: React.FC<LayoutIn> = ({ children, heroSrc, topHeight, topfixed, isPosts, classtify = [] }) => {
  const [isMobile, setMobile] = useState(false)
  const { width } = useSize()
  useEffect(() => {
    setMobile(width < 650)
  }, [width])
  return (
    <>
      <HeroBg src={heroSrc} topheight={topHeight} topfixed={topfixed} />
      <div className={style['layout-container']}>
        <div className={style['home-blog-wrapper']}>
          <div className={style['blog-list']}>{children}</div>
          <div className={style['info-wrapper']}>
            {!isMobile && <AuthorCard />}
            <hr />
            {!isPosts && (
              <>
                <h3>分类</h3>
                <ClasstifyCard classtify={classtify} />
                <div>xixi</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
