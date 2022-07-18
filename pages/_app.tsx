import 'antd/dist/antd.min.css'
import '../styles/globals.scss'
import Prismjs from 'prismjs'
import {type AppProps  } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    Prismjs.highlightAll();
}

  return <Component {...pageProps} />
}
 
export default MyApp
