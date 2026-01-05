import styles from './Nick.module.scss'

import { useContext } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'

const Nick = () => {
  const { store } = useContext(Context)

  return (
    <section className={styles.nick}>
      <img
        className={styles.nickImage}
        src={`https://mineskin.eu/helm/${store.user?.nickname}`}
        alt=''
        loading='lazy'
        draggable='false'
      />
      <div className={styles.nickField}>
        <h1 className={`${styles.nickField__nick} h3`}>
          {store.user?.nickname}
        </h1>
        <button className={styles.nickField__edit}>
          <span className='visually-hidden'>Edit</span>
        </button>
      </div>
    </section>
  )
}

export default observer(Nick)
