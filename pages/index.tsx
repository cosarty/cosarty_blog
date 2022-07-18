
import type { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import CodeBlock from './notes/CodeBlock'


const DynamicComponent = dynamic(() => import('@/pages/notes/test.mdx'))



export default function Home(props:NextPageContext) {

  const components = {
    pre: CodeBlock,
    code:(props)=><b {...props} style={{fontSize:'30px'}}></b>
  }
  

  return (
    <DynamicComponent components={components}></DynamicComponent>
  )
 

}


export const getStaticProps = async () => {
  console.log('我构建了')
 const cmp =  await import('@/pages/notes/test.mdx').then((res:any) =>  res?.meta)
 console.log('cmp: ', cmp);
  
  // console.log(readdirSync('./'))
  // console.log(require('./notes/test.mdx').default);
  return {
    props: { name: 'cxn' } 
  } 
}

