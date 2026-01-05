import styles from './Whitelist.module.scss'

import { useContext, useState } from 'react'
import Button from '@/global-components/Button/Button'
import { Context } from '@/main'
import usePageMetadata from '@/usePageMetadata'
import { observer } from 'mobx-react-lite'
import { toast } from 'sonner'

const Whitelist = () => {
  const { store } = useContext(Context)

  const [loading, setLoading] = useState(false)
  const [nick, setNick] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      setLoading(true)

      await store.changeNickname(nick)

      setLoading(false)
      window.location.href = '/'
    } catch (e) {
      setLoading(false)
      setError(e.response?.data?.message)
    }
  }

  const handleInvalid = (event) => {
    event.preventDefault()

    setError('Заполните поле')
  }

  usePageMetadata({
    title: 'Whitelist',
    index: false,
    follow: false
  })

  return (
    <main>
      <section className={`${styles.whitelist} container`}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h1 className={`${styles.title} h3`}>Добавьте свой ник в вайтлист</h1>
          <div className={styles.form__body}>
            <div className={styles.input}>
              <img
                className={styles.input__icon}
                src={
                  nick
                    ? `https://mineskin.eu/helm/${nick}`
                    : `https://mineskin.eu/helm/null`
                }
                alt=''
                width={50}
                height={50}
                loading='lazy'
                draggable='false'
              />
              <input
                className={`${styles.input__field} ${error && styles.input__error}`}
                type='text'
                placeholder='nagibator777'
                value={nick}
                onChange={(e) => {
                  const expression = /[^a-zA-Z0-9_]/g
                  const value = e.target.value

                  if (expression.test(value)) {
                    toast.error(
                      'Разрешены только английские буквы, цифры и символ _'
                    )
                  }

                  setNick(value.trim().replace(expression, ''))
                  setError('')
                }}
                onInvalid={handleInvalid}
                title=''
                required
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <p className={`${styles.disclaimer} gray-text`}>
              Потом поменять ник будет нельзя. Если вы неправильно вписали ник,
              обратитесь к администратору
            </p>
          </div>
          <Button
            className={styles.button}
            type='submit'
            color='accent'
            loading={loading}
          >
            Готово
          </Button>
        </form>
      </section>
    </main>
  )
}

export default observer(Whitelist)
