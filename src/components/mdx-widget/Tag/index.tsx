import style from './tag.module.scss';
import { useImge } from '@/utils/hooks';
import { useRef } from 'react';

const P = (props: any) => {
  return <p {...props} style={{ lineHeight: 2 }}></p>;
};

const A = (props: any) => {
  return <a {...props} className={style['tag-a']}></a>;
};

const Code = (props: any) => {
  return <code {...props} className={style['tag-code']}></code>;
};

const H1 = ({ children }: any) => {
  const h1ref = useRef<HTMLDivElement>(null);

  return (
    <h1
      ref={h1ref}
      style={{ fontSize: '2.3em', backgroundSize: '2.3rem', backgroundPosition: ' left -0.5rem top 5rem' }}
      id={children}
      className={style['tag-h']}
    >
      {children}
    </h1>
  );
};
const H2 = ({ children }: any) => {
  return (
    <h2
      id={children}
      style={{ fontSize: '1.8em', backgroundSize: '1.8rem', backgroundPosition: ' left -0.3rem top 5rem' }}
      className={style['tag-h']}
    >
      {children}
    </h2>
  );
};
const H3 = ({ children }: any) => {
  return (
    <h3
      id={children}
      style={{ fontSize: '1.5em', backgroundSize: '1.5rem', backgroundPosition: ' left -0.2rem top 5rem' }}
      className={style['tag-h']}
    >
      {children}
    </h3>
  );
};

const Blockquote = (props: any) => {
  return <blockquote {...props} className={style['tag-blockquote']}></blockquote>;
};

const Ul = (props: any) => {
  return <ul {...props} className={style['tag-ul']}></ul>;
};
const Ol = (props: any) => {
  return <ol {...props} className={style['tag-ol']}></ol>;
};
const Img = (props: any) => {
  return <img {...props} className={style['tag-img']} src={useImge(`blog/${props.src}`)} />;
};

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
};
