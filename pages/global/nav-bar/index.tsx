import  style  from './navbar.module.scss'
import NvaWidget from './nva-widget'
import  {MENU_CONFIG} from '@/constants/nav-link'
const NavBar = () => {
  

  return <>
    <header className={style['navbar-box']}>
      <NvaWidget.Logo></NvaWidget.Logo>
      <nav className={style['navbar-link-wrapper']}>
      <NvaWidget.Search />
      <NvaWidget.Links conf={MENU_CONFIG} />
      </nav>
    </header>
   
  </>
}


export default NavBar