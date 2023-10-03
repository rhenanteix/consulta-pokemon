import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './MenuPokeBall.module.css'

export default function MenuPokeBall() {
  const [isOpen, setIsOpen] = useState(true)
  const className = `${styles.menu} ${isOpen ? styles.open : styles.close}`
  

  useEffect(() => {
    setTimeout(() => setIsOpen(false), 5000)
  }, [])

  return (
    <div className={className}>
      <Image src="/images/white-pokeball.svg" alt="Centro Pokémon" width={34} height={34} />
      <p className={styles.text}>Centro Pokémon</p>
    </div>
  )
}