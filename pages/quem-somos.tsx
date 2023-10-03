import Head from 'next/head'

import About from "@/components/organisms/About"

export default function QuemSomos() {
  return (
    <>
      <Head>
        <title>Quem Somos</title>
        <meta name="description" content="A maior rede de tratamento pokémon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </>
  )
}