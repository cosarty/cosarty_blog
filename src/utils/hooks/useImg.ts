import { useEffect, useState } from 'react'



const getImagModule: (key: string) => Promise<any> = async (key: string) => {
  try {
    return await import(`@/assets/${key}`)

  } catch (error) {
    return await import('@/assets/blog_bg.jpg')
  }
}

const useImge = (src: string): string => {
  // 获取图片资源
  const [imgSrc, SetImgSrc] = useState('')
  useEffect(() => {
    getImagModule(src).then((res) => {
      SetImgSrc(res.default.src)
    })
  }, [src])

  return imgSrc
}



export { getImagModule, useImge }