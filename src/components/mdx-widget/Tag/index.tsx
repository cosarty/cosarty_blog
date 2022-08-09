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

const H1 = ({ children }: any) => {
  return (
    // <a href={`#${children}`} style={{ display: 'block', height: '100%' }} title="children">

    // </a>
    <h1 style={{ fontSize: '2.3em' }} id={children} className={style['tag-h1']}>
      {children}
    </h1>
  )
}
const H2 = (props: any) => {
  return <h1 {...props} style={{ fontSize: '1.8em' }}></h1>
}
const H3 = (props: any) => {
  return <h1 {...props} style={{ fontSize: '1.5em' }}></h1>
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
  img: Img,
  h2: H2,
  h3: H3
}
