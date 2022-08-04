import { Context, createContext, FC, ReactElement, useContext, useState, useEffect } from 'react'
import { useSize } from '@/utils/hooks'
export interface StateOption {
  isMobile?: boolean | null
}

let globalState: Context<StateOption>

const createGloblState = () => {
  globalState = createContext<StateOption>({ isMobile: null })

  return globalState.Provider
}

const useGlobalState = () => useContext(globalState)

const Provider: FC<{ children: ReactElement }> = ({ children }) => {
  const { width } = useSize()
  const GlobalState = createGloblState()

  const [global, setGlobal] = useState<StateOption>({ isMobile: null })

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
