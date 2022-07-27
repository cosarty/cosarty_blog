const MENU_CONFIG = {
  classify: {
    name: '分类',
    icon: 'weixin',
    href: '/category',
    sub: []
  },
  archive: {
    name: '归档',
    icon: 'qq',
    href: '/',
    sub: []
  },
  blogroll: {
    name: '友链',
    icon: 'weixin',
    href: '/',
    sub: []
  },
  about: {
    name: '关于',
    icon: 'weixin',
    href: '/',
    sub: []
  },
  collect: {
    name: '很棒的内容',
    icon: 'weixin',
    href: '/',
    sub: [
      {
        name: 'vue3',
        icon: false,
        href: '/',
      }
    ]
  }

}

export type MenuItemType = {
  name: string,
  icon: string | boolean,
  href: string,
  sub?: MenuItemType[]
}

export type MenuType = typeof MENU_CONFIG


export default MENU_CONFIG
export { MENU_CONFIG } 