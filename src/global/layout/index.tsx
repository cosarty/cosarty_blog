import React from 'react'
import NavBar from '../nav-bar'
import style from './layout.module.scss'

interface LayoutIn {
  children: React.ReactElement
}

const Layout: React.FC<LayoutIn> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={style['layout-container']}>{children}</div>
    </>
  )
}

export default Layout
