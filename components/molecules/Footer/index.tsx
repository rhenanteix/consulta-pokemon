import styles from './Footer.module.css'

export default function Footer () {
  const description = 'Todas as marcas e ilustrações utilizadas são de seus resepctivos donos.'
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        { description }
      </p>
    </footer>
  )
}