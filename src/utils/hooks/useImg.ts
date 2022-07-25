import { useState } from 'react'



const getImagModule = async (key: string | string[]) => {
  try {

    return await import(`@/assets/${key}`)
  } catch (error) {
    return await import('@/assets/blog_bg.jpg')
  }
}

const useImge = (src: string): string => {
  // 获取图片资源
  const [imgSrc, SetImgSrc] = useState('')
  getImagModule(src).then((res) => {
    SetImgSrc(res.default.src)
  })

  return imgSrc
}



export { getImagModule, useImge }