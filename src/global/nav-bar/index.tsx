import style from './navbar.module.scss'
import NvaWidget from './nva-widget'
import { MENU_CONFIG } from '@/constants/nav-link'
import { useState } from 'react'

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false)

  return (
    <>
      <header className={style['navbar-box']}>
        <div className={style['nav-logo-wrapper']}>
          <div
            className={`${style['switch-container']} ${showSideBar ? style['change'] : ''}`}
            onClick={() => {
              setShowSideBar((pre) => !pre)
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <NvaWidget.Logo></NvaWidget.Logo>
        </div>
        <nav className={style['navbar-link-wrapper']}>
          <NvaWidget.Search />
          <NvaWidget.Links conf={MENU_CONFIG} show={showSideBar} />
        </nav>
      </header>
    </>
  )
}

export default NavBar
