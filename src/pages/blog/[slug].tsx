import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getNotesKey, checkNotesKey, getNoteMeta, genNotesList, getClasstifyList, getTagsList } from '~/lib/api';
import MdxWidget from '@/components/mdx-widget';
import Layout from '@/global/layout';
import style from '@/styles/page/blog.module.scss';
import SvgGo from '@/components/svg-go';
import { len, debounce, throttle } from '@/utils';

const DynamicComponent = (key: string) => dynamic(() => import(`~/posts/notes/${key}.mdx`));

type BlogPostProps = MetaInfoType & {
  meta: PostInfoModel;
  changeCount: (state: noteNumType) => void;
};

const BlogPost: FC<BlogPostProps> = ({ meta, posts, classtify, tags, changeCount }) => {
  const router = useRouter();
  const [currentHash, setCurrentHash] = useState<string | undefined>('');
  const [menu, setMenu] = useState<TitleDepType[]>([]);
  const catalogRef = useRef<HTMLDivElement>(null);

  const count: noteNumType = {
    notes_count: len(posts),
    classtify_count: len(classtify),
    tag_count: len(tags)
  };
  useEffect(() => {
    changeCount(count);
  }, [posts]);
  // 动态获取文章
  const Blog = DynamicComponent(router.query.slug as string);

  const { title, tag, author, date } = meta;

  // 判断最大可滚动区域
  const maxScroll = () =>
    document.documentElement.scrollTop + 2 >
    document.documentElement.offsetHeight - document.documentElement.clientHeight;

  // hash事件
  const hashChangeHendle = () => {
    if (maxScroll()) {
      setCurrentHash(decodeURIComponent(location.hash).replace('#', ''));
    }
  };

  const scrollHandlehlight = debounce(() => {
    // 设置菜单定位
    const b = catalogRef.current?.previousElementSibling?.getBoundingClientRect().bottom!;
    const method = b < 60 ? 'add' : 'remove';
    catalogRef.current?.classList[method](style['fixed']);

    // 设置菜单激活
    const catalogs = Array.from(document.querySelectorAll('[class*=tag-h]'));
    if (currentHash === '') {
      setCurrentHash(catalogs[0]?.id);
    }
    // tslint:disable-next-line: forin
    for (const idx in catalogs) {
      if (catalogs[idx].getBoundingClientRect().top < 10) {
        setCurrentHash(catalogs[idx].id);
        continue;
      }

      //TODO 历史遗留
      if (maxScroll() && catalogs[idx].getBoundingClientRect().top > 10) {
        const hash = decodeURIComponent(location.hash).replace('#', '');
        const ci = catalogs.findIndex((c) => c.id === hash);
        if (ci >= Number(idx)) {
          setCurrentHash(hash);
        }

        break;
      }
    }
  }, 50);

  useEffect(() => {
    // tslint:disable-next-line: align
    (async () => {
      const res = await fetch(window.location.origin + `/api/getmenu/${router.query.slug}`);
      const menu = (await res.json()) as TitleDepType[];
      setMenu(menu);
      // 初始化目录
      setCurrentHash(document.querySelector('[class*=tag-h]')?.id);
    })();
    window.addEventListener('scroll', scrollHandlehlight);
    window.addEventListener('hashchange', hashChangeHendle);
    return () => {
      window.removeEventListener('scroll', scrollHandlehlight);
      window.removeEventListener('hashchange', hashChangeHendle);
    };
  }, []);

  // 渲染目录
  const Catalog = (menuDep: TitleDepType[]) => {
    return (
      menuDep.length > 0 && (
        <ol>
          {menuDep.map((m, idx) => (
            <li key={idx}>
              <>
                <a className={`${currentHash === m.title ? style['active'] : ''}`} href={`#${m.title}`}>
                  {m.title}
                </a>
                {Catalog(m.sub)}
              </>
            </li>
          ))}
        </ol>
      )
    );
  };

  const menuRender = (
    <>
      <div className={style['catalog-box']} ref={catalogRef}>
        <div className={style['catalog-name']}>分类</div>
        {Catalog(menu)}
      </div>
    </>
  );

  return (
    <>
      <Layout
        heroSrc={`blog/${meta.previewImg}`}
        topHeight={55}
        topfixed={false}
        isPosts
        showContent={false}
        count={count}
        // 渲染目录
        postCustom={() => menuRender}
      >
        <>
          <div className={style['notes-wrapper']}>
            <div className={style.content}>
              <h2>{title}</h2>
              <hr />
              <div className={style['post-meta']}>
                <span>
                  <SvgGo icon="gerenzhongxin" style={{ width: '1.3rem', height: '1.3rem' }} />
                  {author}
                </span>
                <span>
                  <SvgGo icon="rili" style={{ width: '1.3rem', height: '1.3rem' }} />
                  {date}
                </span>
                <span>
                  <SvgGo icon="biaoqian1" style={{ width: '1.3rem', height: '1.3rem' }} />
                  {tag?.join(',')}
                </span>
              </div>
            </div>

            {/*  @ts-ignore */}
            <Blog components={MdxWidget}></Blog>
          </div>
        </>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await genNotesList();
  const paths = (await getNotesKey()).map((key) => ({ params: { slug: key } }));
  return {
    paths,
    fallback: false
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const posts = await genNotesList();
  if (!(await checkNotesKey(params.slug))) {
    return { notFound: true };
  }
  const classtify = await getClasstifyList();
  const tags = await getTagsList();
  return {
    props: { meta: getNoteMeta(params.slug), posts, classtify, tags }
  };
};

export default BlogPost;
