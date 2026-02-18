import styles from './Buttons.module.scss'

import Button from '@/shared/ui/Button'

type ButtonsType = {
  onLogout: () => void
  isLoading: boolean
}

const Buttons = (props: ButtonsType) => {
  const { onLogout, isLoading } = props

  return (
    <section className={styles.buttons}>
      <Button
        color='red'
        onClick={onLogout}
        isLoading={isLoading}
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
