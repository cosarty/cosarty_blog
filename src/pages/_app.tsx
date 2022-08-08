import '../styles/globals.scss'
import Head from 'next/head'
import Script from 'next/script'
import App from 'next/app'
import NavBar from '@/global/nav-bar'
import Provider from '@/global/provider'
import { AppContext } from 'next/app'
import { type AppProps } from 'next/app'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps & Record<string, any>) {
  const [count, setCount] = useState<Record<string, any>>({ tag_count: 0, notes_count: 0, classtify_count: 0 })

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>我的小站</title>
        <meta name="description" content="先测试测试" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script src="//at.alicdn.com/t/c/font_3533437_7ht7dnhjndw.js" defer></Script>
      <Script src="/ribbon.js" defer></Script>
      <Provider>
        <>
          <NavBar count={count as noteNumType} />
          <div
            style={{
              paddingTop: '4rem',
              minHeight: '100vh',
              overflowX: 'hidden',
              position: 'relative',
              top: 0,
              left: 0
            }}
          >
            <Component
              {...pageProps}
              changeCount={(state: noteNumType) => {
                //  如果保存了就不重新赋值了
                if (!Object.keys(count).some((key) => !!count[key])) {
                  setCount(state)
                }
              }}
            />
          </div>
        </>
      </Provider>
    </>
  )
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
