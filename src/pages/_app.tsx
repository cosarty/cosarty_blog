import 'antd/dist/antd.min.css'
import '../styles/globals.scss'

import Head from 'next/head'
import Script from 'next/script'
import App from 'next/app'
import NavBar from '@/global/nav-bar'
import { AppContext } from 'next/app'
import Provider from '@/global/provider'

import { type AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>我的小站</title>
        <meta name="description" content="先测试测试" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script src="/iconfont.js"></Script>
      <Script src="/ribbon.js"></Script>

      <NavBar />
      <Component {...pageProps} />
    </>
  )
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
