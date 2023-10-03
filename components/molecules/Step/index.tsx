import Link from 'next/link'

import IStep from "./Props"

import styles from './Step.module.css'

export default function Step (props: IStep) {
  const router = `/${props.router}`

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li className={styles.item}>
            <Link href='/'>Home</Link>
          </li>
          <li className={styles.item}>
            <Link href={router}>{props.actualStepName}</Link>
          </li>
        </ul>

        <h2 className={styles.title}>{ props.title }</h2>
        <p className={styles.slogan}>{ props.slogan }</p>
      </div>
    </div>
  )
}