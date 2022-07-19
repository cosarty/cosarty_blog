import {FC} from 'react'
import Image from 'next/image'
import Avartar from '@/assets/caos_avatar.jpg'
import style from './nva-widget.module.scss'
import SvgGo from '@/pages/components/svg-go'

import {NvaLinkProps} from './interface'


// export interface NavLogoProps {
//   logoScr: string
//   LogoName:string
// }



const Logo = () => {
  return <>
    <div className={style['logo']}>
      <Image src={Avartar} width={50} height={50}></Image>
      <h2>
        cos
      </h2>
    </div>
 
  </>
}

const Links:FC<NvaLinkProps> = ({conf}) => {
  return  <div className={style['navbar-link-items']}>
  <div className={style['navbar-link-item']}>
   <SvgGo icon='qq'/>
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
}



export default {Logo,Links}