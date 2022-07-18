import styles from '../styles/Home.module.scss'
import type { NextPageContext } from 'next'


import { Pagination } from 'antd';


export default function Home(props:NextPageContext) {
  console.log(props)
  
  // /notes/first-news
  return <div className={styles.container}>{require('@/pages/notes/test.mdx').default()}
  <Pagination defaultCurrent={1} total={50} />;</div>
}


export const getStaticProps = async () => {
  // console.log('我构建了')
  // console.log(require('@/pages/notes/test.mdx').meta)
  
  // console.log(readdirSync('./'))
  
  return {
    props: { name: 'cxn' }
  }
}

