import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Store'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

const App = ({ Component, pageProps: {session, ...pageProps} }: AppProps) => {
  return (
  <SessionProvider session={session}>
    <StoreProvider>
      <Layout>
       <Component {...pageProps} />
      </Layout>
    </StoreProvider>
   </SessionProvider>
  )
}

export default App
