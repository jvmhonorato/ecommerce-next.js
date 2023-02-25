import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Store'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { NextComponentType  } from 'next'
type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean} // add auth type
}

const App = ({ Component, pageProps: {session, ...pageProps} }: CustomAppProps) => {
  return (
  <SessionProvider session={session}>
    <StoreProvider>
      {Component.auth ? (
        <Auth>
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </Auth>
      ):(
      
      
      <Layout>
       <Component {...pageProps} />
      </Layout>
      )}
    </StoreProvider>
   </SessionProvider>
  )
}

function Auth({ children }:any){
  const router = useRouter();
  const {status} = useSession({
    required: true,
    onUnauthenticated(){
      router.push('/unauthorized?message=login required');
    }
  });
  if(status === 'loading'){
    return <div>Loading...</div>
  }
  return children;
}

export default App
