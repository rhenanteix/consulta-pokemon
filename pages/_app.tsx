import '@/styles/globals.css'
import '@/styles/home.css'
import '@/styles/about.css'
import '@/styles/schedule.css'

import type { AppProps } from 'next/app'

import Default from 'layout/default'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Default>
      <Component {...pageProps} />
    </Default>
  )
}
