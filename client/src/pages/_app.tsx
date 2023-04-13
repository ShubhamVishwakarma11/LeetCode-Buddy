import { UrlContextProvider } from '@/contexts/UrlContext'
import { UserContextProvider } from '@/contexts/UserContext'
import CommonLayout from '@/layouts/CommonLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <UrlContextProvider>
        <CommonLayout>
            <Component {...pageProps} />
        </CommonLayout> 
      </UrlContextProvider>
    </UserContextProvider> 
  )
}
