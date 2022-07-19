import  style  from './navbar.module.scss'
import nav_link_config from '@/config/nav-link'
import NvaWidget from './nva-widget'

const NavBar = () => {
  

  

  return <>
    <header className={style['navbar-box']}>
      <NvaWidget.Logo></NvaWidget.Logo>
      <nav className={style['navbar-link-wrapper']}>
        <div className={style['navbar-search-box']}>
          <input type={'text'} />
        </div>
        <div className={style['navbar-link-items']}>
          <div className={style['navbar-link-item']}>
            <i>icon</i>
            <span>
            分类
            </span>
          </div>
          <div className={style['navbar-link-item']}>
            <i>icon</i>
            <span>
            友链
            </span>
          </div>
          <div className={style['navbar-link-item']}>
            <i>icon</i>
            <span>
            归档
            </span>
          </div>
          <div className={style['navbar-link-item']}>
            <i>icon</i>
            <span>
            关于
            </span>
          </div>
        </div>
      </nav>
    </header>
   
  </>
}


export default NavBar