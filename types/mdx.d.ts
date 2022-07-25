
declare module '*.mdx' {
  let MDXComponent: (props: Record<string, any> & { components: any }) => JSX.Element
  export const meta: PostInfoModel = {}
  export default MDXComponent
}
