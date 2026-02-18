import styles from './Nick.module.scss'

import { observer } from 'mobx-react-lite'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'

const Nick = observer(() => {
  const { userStore } = useCustomContext(MainContext)

  return (
    <section className={styles.nick}>
      <img
        className={styles.nick__image}
        src={`https://mineskin.eu/helm/${userStore.user?.nickname ?? 'undefined'}`}
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
