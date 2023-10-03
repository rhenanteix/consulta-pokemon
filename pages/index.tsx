import Head from 'next/head'

import Main from '@/components/organisms/Main'

export default function Home() {

  return (
    <>
      <Head>
        <title>Centro Pokémon</title>
        <meta name="description" content="Cuidamos bem do seu pokémon, para ele cuidar bem de você" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />
    </>
  )
}
