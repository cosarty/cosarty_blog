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

  useEffect(() => {
    ;(async () => {})()
  })

  const [global, setGlobal] = useState<StateOption>({ isMobile: true })

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
