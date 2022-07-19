import  style  from './navbar.module.scss'
import NvaWidget from './nva-widget'
import nav_conf from '@/constants/nav-link'
const NavBar = () => {
  

  

  return <>
    <header className={style['navbar-box']}>
      <NvaWidget.Logo></NvaWidget.Logo>
      <nav className={style['navbar-link-wrapper']}>
        <div className={style['navbar-search-box']}>
          <input type={'text'} />
        </div>
        <NvaWidget.Links conf={nav_conf} />
      </nav>
    </header>
   
  </>
}


export default NavBar