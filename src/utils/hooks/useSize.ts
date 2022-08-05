import { isBrowser } from '../index'
import { useState, useEffect } from 'react'


const useSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const update = () => {

    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  // ssr没有window对象
  useEffect(() => {
    if (isBrowser) {
      update()

      window.addEventListener('resize', update)
    }
  }, [])


  return {
    width,
    height
  }
}



export { useSize }