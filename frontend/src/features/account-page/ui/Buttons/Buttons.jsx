import styles from './Buttons.module.scss'

import Button from '@/shared/ui/Button'

const Buttons = (props) => {
  const { onLogout, loading } = props

  return (
    <section className={styles.buttons}>
      <Button
        color='red'
        onClick={onLogout}
        loading={loading}
      >
        Выйти из аккаунта
      </Button>
      {/* <Button 
                color='redPale'
            >
                Сообщить о нарушении
            </Button> */}
    </section>
  )
}

export default Buttons
