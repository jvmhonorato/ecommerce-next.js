import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Store'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <Layout>
       <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default App
