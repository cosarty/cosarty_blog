import { ChangeEvent, FC, useRef, useState } from 'react'
import Image from 'next/image'
import Avartar from '@/assets/caos_avatar.jpg'
import style from './nav-widget.module.scss'
import SvgGo from '@/components/svg-go'
import { getKey, len } from '@/utils'
import { NvaLinkProps } from './interface'
import { MenuItemType } from '@/constants/nav-link'
import AuthorCard from '@/components/author-card'
import Link from 'next/link'
import { useGlobalState } from '@/global/provider'

const Logo = () => {
  const { siteName } = useGlobalState()
  return (
    <>
      <Link href="/">
        <div className={style['logo']}>
          <Image src={Avartar} width={40} height={40}></Image>
          <h2>{siteName}</h2>
        </div>
      </Link>
    </>
  )
}

const Links: FC<NvaLinkProps> = ({ conf, show, count }) => {
  const { isMobile } = useGlobalState()
  const [activeKey, setActiveKey] = useState<string[]>([])
  const isSub = (sub: MenuItemType[]) => len(sub) !== 0

  // render subMenu
  const NavSub = (sub: MenuItemType[], key: string) => {
    return (
      <>
        <div className={`${style['submenu']} ${checkActive(key, 'openMenu')}`} id={key}>
          <ul>
            {sub.map((m, i) => (
              <Link href={m.href} key={i}>
                <li key={m.name}>{m.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  //  显示子菜单
  const showSubMenu = (key: string, status: string) => {
    {
      if (!!isMobile) {
        return
      }
      const el = document.getElementById(key)
      if (el) {
        el.style.display = status
      }
    }
  }

  const openMenu = (key: string) => {
    const el = document.getElementById(key)
    if (el && isMobile) {
      setActiveKey((pre) => {
        const idx = pre.indexOf(key)
        return idx === -1 ? [...pre, key] : pre.filter((i) => i !== key)
      })
    }
  }

  const checkActive = (key: string, checkClass: string) => (activeKey.includes(key) && style[checkClass]) || ''

  return (
    <div
      className={`${style['navbar-link-items']} ${show ? style['show-sidebar'] : ''}
    `}
    >
      {isMobile !== null && window.innerWidth < 650 && <AuthorCard count={count} />}

      {getKey(conf).map((key) => {
        const { name, icon, sub, href } = conf[key]

        const el = (
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

        return !isSub(sub) ? (
          <Link href={href} key={key}>
            {el}
          </Link>
        ) : (
          el
        )
      })}
    </div>
  )
}

const Search: FC<{}> = () => {
  const [searchValue, setSearchValue] = useState('')
  const [search, setSearch] = useState<[string, PostInfoModel][]>([])
  const [isShow, setIsShow] = useState(false)
  const { posts = [] } = useGlobalState()

  const searchNotes = () => {
    const searchNote = posts.filter(([name, meta]) => {
      // ~-1==0
      return ~meta.title.search(searchValue)
    })
    setSearch(searchNote)
  }
  const renderOption = (title: string) => {
    const [pre, next] = title.split(searchValue)
    return [pre, <span style={{ color: 'aqua' }}>{searchValue}</span>, next]
  }
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <div
        className={style['navbar-search-box']}
        onClick={() => {
          ref.current?.focus()
          // console.log(ref.current === document.activeElement)
        }}
      >
        <SvgGo icon="sousuo" style={{ height: '1.3rem', width: '1.3rem' }} />
        <input
          type={'text'}
          ref={ref}
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value)
            searchNotes()
          }}
          onFocus={() => {
            setIsShow(true)
          }}
          onBlur={() => {
            setIsShow(false)
          }}
          // onInput={searchNotes}
        />
        {isShow && searchValue && (
          <ul className={style['suggestion']}>
            {search.map(([name, meta]) => (
              <Link key={name} href={{ pathname: '/blog/[slug]', query: { slug: name } }}>
                <li>{renderOption(meta.title)}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default { Logo, Links, Search }
