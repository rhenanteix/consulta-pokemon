import Image from 'next/image'

import Button from "@/components/atoms/Button"
import IScheduleStatus from "./Props"

import styles from './ScheduleStatus.module.css'

export default function ScheduleStatus(props: IScheduleStatus) {

  return (
    <div className={styles.scheduleStatus}>
      <div className={styles.container}>
        <h2 className={styles.title}>{props.title}</h2>

        <div className={styles.icon}>
          {
            props.status === 'success' ? <Image src="/check.svg" alt="Sucesso" width={42} height={42} /> : <Image src="/warning.svg" alt="Error" width={32} height={32} />
          }
        </div>

        <div className={styles.message}>{props.message}</div>


        <Button textLabel="Fazer Novo Agendamento" onClickEvent={() => window.location.reload()} />
      </div>
    </div>
  )
}