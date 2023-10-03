import Head from 'next/head'

import Schedule from "@/components/organisms/Schedule"

export default function AgendarConsulta() {
  return (
    <>
      <Head>
        <title>Agendar Consulta</title>
        <meta name="description" content="Recupere seus pokémons em 5 segundos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Schedule />
    </>
  )
}