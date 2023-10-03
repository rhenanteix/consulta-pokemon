import { Inter } from '@next/font/google'

import Header from "@/components/molecules/Header"
import Footer from "@/components/molecules/Footer" 

const inter = Inter({ subsets: ['latin'] })

export default function Default({ children }) {
  return (
    <main className={inter.className}>
      <Header />
      <main>{ children }</main>
      <Footer />
    </main>
  )
}