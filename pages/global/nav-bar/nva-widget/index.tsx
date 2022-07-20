import {FC} from 'react'
import Image from 'next/image'
import Avartar from '@/assets/caos_avatar.jpg'
import style from './nav-widget.module.scss'
import SvgGo from '@/pages/components/svg-go'
import { getKey } from '@/utils'

import {NvaLinkProps} from './interface'


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

const Links:FC<NvaLinkProps> = ({conf}) => {
  console.log('conf: ', conf);
  return <div className={style['navbar-link-items']}>
    {getKey(conf).map((key)=>  <div key={key} className={style['navbar-link-item']}>
      <SvgGo icon={conf[key].icon} style={{width:'1.3rem',height:'1.3rem'} } />
    <span>
      {conf[key].name}
    </span>
  </div>)}

 
</div>
}

const Search:FC<{}> = () => {


  return<>
     <div className={style['navbar-search-box']}>
          <input type={'text'} />
        </div>
  </>
  
}



export default {Logo,Links,Search}