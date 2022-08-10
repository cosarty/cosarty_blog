import React, { ReactNode, useEffect, useState } from 'react';
import HeroBg from '@/components/hero-bg';
import style from './layout.module.scss';
import AuthorCard from '@/components/author-card';
import ClasstifyCard from '@/components/classtify-card';
import TagsCard from '@/components/tags-card';
import { useGlobalState } from '../provider';

interface LayoutIn {
  children: React.ReactElement;
  heroSrc?: string;
  topHeight?: number;
  topfixed?: boolean;
  isPosts?: boolean;
  classtify?: [string, string[]][];
  tags?: [string, string[]][];
  showContent?: boolean;
  count: { notes_count: number; classtify_count: number; tag_count: number };
  postCustom?: () => ReactNode;
}

const Layout: React.FC<LayoutIn> = ({
  children,
  heroSrc,
  topHeight,
  topfixed,
  isPosts,
  classtify = [],
  tags,
  showContent,
  count,
  postCustom
}) => {
  const { isMobile } = useGlobalState();
  return (
    <>
      <HeroBg src={heroSrc} topheight={topHeight} topfixed={topfixed} showContent={showContent} />
      <div className={style['layout-container']}>
        <div className={style['home-blog-wrapper']}>
          <div className={style['blog-list']}>{children}</div>
          {isMobile !== null && !isMobile && (
            <div className={style['info-wrapper']}>
              {/*  tslint:disable-next-line: no-non-null-assertion */}
              <AuthorCard count={count} />
              <hr />
              {!isPosts && (
                <>
                  <h3>分类</h3>
                  <ClasstifyCard classtify={classtify} />
                  <h3>标签</h3>
                  <TagsCard tags={tags} />
                </>
              )}
              {postCustom?.()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
