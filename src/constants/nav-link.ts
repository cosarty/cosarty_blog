const MENU_CONFIG = {
  classify: {
    name: '分类',
    icon: 'fenlei',
    href: '/category',
    sub: []
  },
  archive: {
    name: '归档',
    icon: 'qianyueguidang',
    href: '/archives',
    sub: []
  },
  blogroll: {
    name: '友链',
    icon: 'youhuiquan-',
    href: '/',
    sub: []
  },
  about: {
    name: '关于',
    icon: 'guanyuwomen',
    href: '/',
    sub: []
  },
  collect: {
    name: '很棒的内容',
    icon: 'wenzhang',
    href: '',
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