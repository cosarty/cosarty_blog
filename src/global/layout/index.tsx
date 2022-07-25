import React from 'react'
import HeroBg from '@/components/hero-bg'
import style from './layout.module.scss'
import AuthorCard from '@/components/author-card'
interface LayoutIn {
  children: React.ReactElement
  heroSrc?: string
  topHeight?: number
  topfixed?: boolean
}

const Layout: React.FC<LayoutIn> = ({ children, heroSrc, topHeight, topfixed }) => {
  return (
    <>
      <HeroBg src={heroSrc} topheight={topHeight} topfixed={topfixed} />
      <div className={style['layout-container']}>
        <div className={style['home-blog-wrapper']}>
          <div className={style['blog-list']}>{children}</div>
          <div className={style['info-wrapper']}>
            <AuthorCard />
            <hr />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
