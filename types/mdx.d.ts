
declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export const meta: PostInfoModel = {}
  export default MDXComponent
}
