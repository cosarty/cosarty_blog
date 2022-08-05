import { Context, createContext, FC, ReactElement, useContext, useState, useEffect, Dispatch } from 'react'
import { useSize } from '@/utils/hooks'
import blog_config from '~/blog.conf'

export type BlogMeta = typeof blog_config

export type StateOption = {
  isMobile: boolean | null
} & BlogMeta

let globalState: Context<StateOption>

const createGloblState = () => {
  globalState = createContext<StateOption>({ isMobile: null, ...blog_config })

  return globalState.Provider
}

const useGlobalState = () => useContext(globalState)

const Provider: FC<{ children: ReactElement }> = ({ children }) => {
  const { width } = useSize()
  const GlobalState = createGloblState()

  const [global, setGlobal] = useState<StateOption>({ isMobile: null, ...blog_config })

  useEffect(() => {
    if (width < 650 && !global.isMobile) {
      setGlobal({ ...global, isMobile: true })
    }
    if (width > 650 && global.isMobile) {
      setGlobal({ ...global, isMobile: false })
    }
  }, [width])
  return <GlobalState value={global}>{children}</GlobalState>
}

export default Provider

export { createGloblState, useGlobalState }
