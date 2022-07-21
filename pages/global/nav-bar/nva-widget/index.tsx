import {Children, FC} from 'react'
import Image from 'next/image'
import Avartar from '@/assets/caos_avatar.jpg'
import style from './nav-widget.module.scss'
import SvgGo from '@/pages/components/svg-go'
import { getKey, len } from '@/utils'
import {NvaLinkProps} from './interface'
import { MenuItemType } from '@/constants/nav-link'


const Logo = () => {
  return <>
    <div className={style['logo']}>
      <Image src={Avartar} width={40} height={40}></Image>
      <h2>
        cos
      </h2>
    </div>
  </>
}

const Links: FC<NvaLinkProps> = ({ conf }) => {
  const isSub = (sub:MenuItemType[])=>len(sub)!==0

  const NavSub = (sub: MenuItemType[]) => {

    return <><div className={style['submenu']}>
      <ul>
        {sub.map(m => <li key={m.name}>
          {m.name}
        </li>)}
      </ul>
    </div></>
  }
  return <div className={style['navbar-link-items']}>
    {getKey(conf).map((key) => {
      const {icon,name,sub} = conf[key] 

      return (<div key={key} className={style['navbar-link-item']}>
      <SvgGo icon={icon} style={{width:'1.3rem',height:'1.3rem'} } />
      <span>
          {name}
          {isSub(sub) && <SvgGo icon='arrow-down-filling' className={style['arrow']} style={{width:'0.9rem',height:'0.9rem'} }/>}
      </span>
      {isSub(sub)&&NavSub(sub)}
  </div>)
    })}
</div>
}

const Search:FC<{}> = () => {
  return<>
     <div className={style['navbar-search-box']}>
          <SvgGo icon='sousuo' style={{height:'1.2rem',width:'1.2rem'}}/>
          <input type={'text'} />
        </div>
  </>
  
}



export default {Logo,Links,Search}