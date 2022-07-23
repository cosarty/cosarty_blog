import type { NextPageContext } from 'next'
// import Home from './home'
// import dynamic from 'next/dynamic'
// import CodeBlock from './notes/CodeBlock'

// const DynamicComponent = dynamic(() => import('@/pages/notes/test.mdx'))

// const components = {
//   pre: CodeBlock,
//   code:(props)=><b {...props} style={{fontSize:'30px'}}></b>
// }

// return (
//   <DynamicComponent components={components}></DynamicComponent>
// )

export default function Home(props: NextPageContext) {
  console.log('props: ', props)

  return <div>dsa</div>
}

export const getStaticProps = async () => {
  return {
    props: {}
  }
}
