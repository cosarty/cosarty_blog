import 'antd/dist/antd.min.css'
import '../styles/globals.scss'
import Layout from './global/layout'
import Head  from 'next/head'

import {type AppProps  } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
        <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>
         我的小站
        </title>
        <meta
          name="description"
          content="先测试测试"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout >
      <Component {...pageProps} />
      </Layout>
  </>
}
 
export default MyApp
