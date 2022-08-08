import { Context, createContext, FC, ReactElement, useContext, useState, useEffect } from 'react'
import { useSize } from '@/utils/hooks'
import blog_config from '~/blog.conf'

export type BlogMeta = typeof blog_config
type Posts = Partial<Pick<MetaInfoType, 'posts'>>
export type StateOption = {
  isMobile: boolean | null
} & BlogMeta &
  Posts

let globalState: Context<StateOption>

const createGloblState = () => {
  globalState = createContext<StateOption>({ isMobile: null, ...blog_config, posts: [] })

  return globalState.Provider
}

const useGlobalState = () => useContext(globalState)

const Provider: FC<{ children: ReactElement }> = ({ children }) => {
  const { width } = useSize()
  const GlobalState = createGloblState()

  const [global, setGlobal] = useState<StateOption>({
    isMobile: null,
    ...blog_config,
    posts: []
  })
  useEffect(() => {
    ;(async () => {
      const res = await fetch(window.location.origin + '/api/getnotes')
      const notes = await res.json()
      setGlobal((pre) => ({ ...pre, posts: notes }))
    })()
  }, [])
  useEffect(() => {
    if (width !== 0 && width < 670 && !global.isMobile) {
      setGlobal({ ...global, isMobile: true })
    }
    if (width > 650 && global.isMobile) {
      setGlobal({ ...global, isMobile: false })
    }
    if (width > 650 && global.isMobile === null) {
      setGlobal({ ...global, isMobile: false })
    }
  }, [width])
  return <GlobalState value={global}>{children}</GlobalState>
}

export default Provider

export { createGloblState, useGlobalState }
