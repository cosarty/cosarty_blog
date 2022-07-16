import React from 'react'
import { useRouter } from 'next/router'

const MyFirst = () => {
  const router = useRouter()
  return (<div onClick={() => router.push('/list/[id]', '/list/3')}>first news</div>)

}


export default MyFirst 
