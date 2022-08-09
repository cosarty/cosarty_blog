import style from './tag.module.scss'
import { useImge } from '@/utils/hooks'

const P = (props: any) => {
  return <p {...props} style={{ lineHeight: 2 }}></p>
}

const A = (props: any) => {
  return <a {...props} className={style['tag-a']}></a>
}

const Code = (props: any) => {
  return <code {...props} className={style['tag-code']}></code>
}

const H1 = (props: any) => {
  // console.log('props: ', props)

  return (
    <>
      <h1 {...props}></h1>
    </>
  )
}

const Blockquote = (props: any) => {
  return <blockquote {...props} className={style['tag-blockquote']}></blockquote>
}

const Ul = (props: any) => {
  return <ul {...props} className={style['tag-ul']}></ul>
}
const Ol = (props: any) => {
  return <ol {...props} className={style['tag-ol']}></ol>
}
const Img = (props: any) => {
  return <img {...props} className={style['tag-img']} src={useImge(`blog/${props.src}`)} />
}

export default {
  a: A,
  p: P,
  h1: H1,
  code: Code,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  img: Img
}
