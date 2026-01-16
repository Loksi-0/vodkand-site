import styles from './Nick.module.scss'

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { MainContext } from '@/app/context/MainContext'

const Nick = observer(() => {
  const { userStore } = useContext(MainContext)

  return (
    <section className={styles.nick}>
      <img
        className={styles.nick__image}
        src={`https://mineskin.eu/helm/${userStore.user?.nickname}`}
        alt=''
        loading='lazy'
        draggable='false'
      />
      <div className={styles.nick__field}>
        <h1 className='h3'>{userStore.user?.nickname}</h1>
        <button className={styles.nick__edit}>
          <span className='visually-hidden'>Edit</span>
        </button>
      </div>
    </section>
  )
})

export default Nick
