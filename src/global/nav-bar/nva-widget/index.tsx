import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Avartar from '@/assets/caos_avatar.jpg'
import style from './nav-widget.module.scss'
import SvgGo from '@/components/svg-go'
import { getKey, len } from '@/utils'
import { NvaLinkProps } from './interface'
import { MenuItemType } from '@/constants/nav-link'
import { useSize } from '@/utils/hooks'

const Logo = () => {
  return (
    <>
      <div className={style['logo']}>
        <Image src={Avartar} width={40} height={40}></Image>
        <h2>cos</h2>
      </div>
    </>
  )
}

const Links: FC<NvaLinkProps> = ({ conf }) => {
  const [isMobile, setMobile] = useState(false)
  const { width } = useSize()
  const [activeKey, setActiveKey] = useState<string[]>([])
  const isSub = (sub: MenuItemType[]) => len(sub) !== 0
  useEffect(() => {
    setMobile(width < 650)
  }, [width])

  // render subMenu
  const NavSub = (sub: MenuItemType[], key: string) => {
    return (
      <>
        <div className={`${style['submenu']} ${checkActive(key, 'openMenu')}`} id={key}>
          <ul>
            {sub.map((m) => (
              <li key={m.name}>{m.name}</li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  //  显示子菜单
  const showSubMenu = (key: string, status: string) => {
    {
      if (!!isMobile) return
      const el = document.getElementById(key)
      if (el) {
        el.style.display = status
      }
    }
  }

  const openMenu = (key: string) => {
    const el = document.getElementById(key)
    if (el && isMobile) {
      console.log(1)
      setActiveKey((pre) => {
        const idx = pre.indexOf(key)
        return idx === -1 ? [...pre, key] : pre.filter((i) => i !== key)
      })
    }
  }

  const checkActive = (key: string, checkClass: string) => (activeKey.includes(key) && style[checkClass]) || ''

  return (
    <div className={style['navbar-link-items']}>
      {getKey(conf).map((key) => {
        const { name, icon, sub } = conf[key]
        return (
          <div
            key={key}
            className={style['navbar-link-item']}
            onMouseEnter={() => showSubMenu(key, 'block')}
            onMouseLeave={() => showSubMenu(key, 'none')}
            onClick={() => {
              openMenu(key)
            }}
          >
            <SvgGo icon={icon} style={{ width: '1.3rem', height: '1.3rem' }} />
            <span>{name}</span>
            {isSub(sub) && (
              <SvgGo
                icon="arrow-down-filling"
                className={`${style['arrow']} ${checkActive(key, 'down-arrow')}`}
                style={{ width: '0.9rem', height: '0.9rem' }}
              />
            )}
            {isSub(sub) && NavSub(sub, key)}
          </div>
        )
      })}
    </div>
  )
}

const Search: FC<{}> = () => {
  return (
    <>
      <div className={style['navbar-search-box']}>
        <SvgGo icon="sousuo" style={{ height: '1.2rem', width: '1.2rem' }} />
        <input type={'text'} />
      </div>
    </>
  )
}

export default { Logo, Links, Search }
