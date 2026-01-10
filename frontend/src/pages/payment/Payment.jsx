import styles from './Payment.module.scss'

import cx from 'clsx'

import pass from '@/assets/images/frog.png'
import Button from '@/global-components/Button/Button'

import Header from '@/global-components/Header/Header'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'

const Payment = observer(() => {
  const { store } = useContext(Context)

  const [checkboxStyle, setCheckboxStyle] = useState(styles.form__icon)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled] = useState(
    import.meta.env.VITE_DISABLE_PAYMENT === 'true' ? true : false
  )

  const navigate = useNavigate()

  const products = [
    {
      title: 'Доступ на сервер Minecraft',
      subtitle:
        'Сервер является пользовательским проектом и никак не связан с Mojang Studios',
      price: 50,
      icon: pass
    }
  ]

  const handleCheckboxInvalid = (event) => {
    event.preventDefault()

    if (disabled) {
      return
    }

    setCheckboxStyle(cx(styles.form__checkboxIcon, styles.invalid))
    setError('Заполните выделенные поля')
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      if (disabled) {
        return
      }

      const formData = {
        source: 'checkout',
        agreed: checkboxValue
      }

      setLoading(true)
      await store.agreeTerms(formData)

      const response = await store.createOrder('pass')

      navigate(response.data?.confirmation?.confirmation_url)
    } catch (e) {
      setError(e.response?.data?.message)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className={cx(styles.payment, 'container')}>
          <div className={styles.payment__inner}>
            <h1 className={cx(styles.payment__title, 'h3')}>
              Оформление заказа
            </h1>
            <ul className={cx(styles.payment__list, styles.list)}>
              {products.map((element, index) => {
                return (
                  <li
                    key={index}
                    className={styles.list__item}
                  >
                    <div className={styles.list__imageWrapper}>
                      <img
                        className={styles.image}
                        src={element.icon}
                        alt=''
                        loading='lazy'
                        draggable='false'
                      />
                    </div>
                    <div className={styles.list__body}>
                      <h2 className='h5'>{element.title}</h2>
                      <p className={cx(styles.list__subtitle, 'gray')}>
                        {element.subtitle}
                      </p>
                      <h3 className='h4'>{element.price}&nbsp;₽</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
            <form
              onSubmit={handleSubmit}
              className={cx(styles.payment__form, styles.form)}
            >
              <h3 className={cx(styles.form__result, 'h4')}>
                Итого к оплате:{' '}
                {products.reduce((acc, current) => acc + current.price, 0)}
                &nbsp;₽
              </h3>
              <label
                className={styles.form__checkbox}
                htmlFor='agree'
              >
                <input
                  className={styles.form__input}
                  type='checkbox'
                  id='agree'
                  name='agree'
                  title=''
                  onInvalid={handleCheckboxInvalid}
                  onChange={(e) => {
                    setCheckboxStyle(styles.form__icon)
                    setCheckboxValue(e.target.checked)
                    setError('')
                  }}
                  required
                />
                <span className={checkboxStyle}></span>
                <span className={styles.form__label}>
                  Я согласен с{' '}
                  <Link
                    to='/legal/privacy-policy'
                    className='link'
                  >
                    Политикой конфиденциальности
                  </Link>{' '}
                  и{' '}
                  <Link
                    to='/legal/public-offer'
                    className='link'
                  >
                    Публичной офертой
                  </Link>
                </span>
              </label>
              {error && <p className={styles.error}>{error}</p>}
              <Button
                type='submit'
                color='accent'
                disabled={disabled}
                title={disabled ? 'Оплата сейчас отключена' : ''}
                loading={loading}
              >
                Перейти к оплате
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
})

export default Payment
