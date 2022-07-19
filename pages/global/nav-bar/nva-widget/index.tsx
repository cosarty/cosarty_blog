import Image from 'next/image'
import Avartar from '@/assets/caos_avatar.jpg'
import style from './nva-widget.module.scss'

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



export default {Logo}