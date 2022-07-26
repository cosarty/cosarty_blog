import { Context, createContext, FC, ReactElement, useContext, useState, useEffect } from 'react'
import { useSize } from '@/utils/hooks'
export interface StateOption {
  isMobile?: boolean
}

let globalState: Context<StateOption>

const createGloblState = () => {
  globalState = createContext<StateOption>({ isMobile: false })

  return globalState.Provider
}

const useGlobalState = () => useContext(globalState)

const Provider: FC<{ children: ReactElement }> = ({ children }) => {
  const { width } = useSize()
  const GlobalState = createGloblState()

  const [global, setGlobal] = useState<StateOption>({ isMobile: false })

  useEffect(() => {
    setGlobal((pre) => {
      if (width < 650 && !pre.isMobile) pre.isMobile = true
      if (width > 650 && pre.isMobile) pre.isMobile = false
      return pre
    })
  }, [width])
  return <GlobalState value={global}>{children}</GlobalState>
}

export default Provider

export { createGloblState, useGlobalState }
