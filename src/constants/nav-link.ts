const MENU_CONFIG = {
  classify: {
    name: '分类',
    icon: 'biaoqian',
    href: '',
    sub: []
  },
  archive: {
    name: '归档',
    icon: 'qq',
    href: '',
    sub: []
  },
  blogroll: {
    name: '友链',
    icon: 'weixin',
    href: '',
    sub: []
  },
  /*  about: {
     name: '关于',
     icon: 'biaoqian',
     href: '',
     sub: [
       {
         name: '很厉害的文章',
         icon: false,
         href: '',
       },
       {
         name: '很厉害hen的文章',
         icon: false,
         href: '',
       },
     ]
   },
   collect: {
     name: '很棒的内容',
     icon: 'biaoqian',
     href: '',
     sub: [
       {
         name: 'vue3',
         icon: false,
         href: '',
       }
     ]
   }
  */
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