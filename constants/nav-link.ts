const MENU_CONFIG = {
  classify: {
    name: '分类',
    icon: 'biaoqian',
    href: ''
  },
  archive: {
    name: '归档',
    icon: 'qq',
    href: ''
  },
  blogroll: {
    name: '友链',
    icon: 'weixin',
    href: ''
  },
  about: {
    name: '关于',
    icon: 'biaoqian',
    href: '',
    chilren: [
      {
        name: '很厉害的文章',
        icon: false,
        href: '',
      }
    ]
  },
  collect: {
    name: '很棒的内容',
    icon: 'biaoqian',
    href: '',
    chilren: [
      {
        name: 'vue3',
        icon: false,
        href: '',
      }
    ]
  }

}

export type MenuItemType = {
  name: string,
  icon: string | boolean,
  href: string,
}

export type MenuType = typeof MENU_CONFIG


export default MENU_CONFIG
export { MENU_CONFIG } 