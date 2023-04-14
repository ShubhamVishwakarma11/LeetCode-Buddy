import { UrlContextProvider } from '@/contexts/UrlContext'
import { UserContextProvider } from '@/contexts/UserContext'
import CommonLayout from '@/layouts/CommonLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider,InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <UrlContextProvider>
          <CommonLayout>
              <Component {...pageProps} />
          </CommonLayout> 
        </UrlContextProvider>
      </UserContextProvider> 
    </ApolloProvider>
  )
}
