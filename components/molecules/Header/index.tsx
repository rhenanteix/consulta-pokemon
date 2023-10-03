import Link from 'next/link'
import { useRouter } from 'next/router'

import MenuPokeBall from '@/components/atoms/MenuPokeBall'
import Button from '@/components/atoms/Button'

import styles from './Header.module.css'

export default function Header() {
  const router = useRouter()

  return (
    <header className={styles.header}>

      <div className="pokeball-brand">
        <MenuPokeBall />
      </div>

      <ul className={styles.nav}>
        <li className={styles.item}>
          <Link className={styles.link} href='/quem-somos'>Quem Somos</Link>
        </li>
        <li className={styles.item}>
          <Button textLabel='Agendar Consulta' onClickEvent={() => router.push('/agendar-consulta')} />
        </li>
      </ul>
    </header>
  )
}