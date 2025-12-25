import styles from './Payment.module.scss'

import pass from '@/assets/images/frog.png'
import Button from '@/global-components/Button/Button'

import Header from '@/global-components/Header/Header'
import { Context } from '@/main'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'

const Payment = () => {
    const { store } = useContext(Context)

    const [checkboxStyle, setCheckboxStyle] = useState(styles.form__checkboxIcon)
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(import.meta.env.VITE_DISABLE_PAYMENT === 'true' ? true : false)

    const navigate = useNavigate()

    const products = [
        {
            title: 'Доступ на сервер Minecraft',
            subtitle: 'Сервер является пользовательским проектом и никак не связан с Mojang Studios',
            price: 50,
            icon: pass
        }
    ]

    const handleCheckboxInvalid = (event) => {
        event.preventDefault()

        if (disabled) {
            return
        }

        setCheckboxStyle(`${styles.form__checkboxIcon} ${styles.invalid}`)
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
            const response = await store.agreeTerms(formData)

            navigate(import.meta.env.VITE_PAYMENT_URL)
            setLoading(false)
        } catch(e) {
            setError(e.response?.data?.message)
        }
    }

    return (
        <>
            <Header />
            <main>
                <section className={`${styles.payment} container`}>
                    <div className={styles.payment__inner}>
                        <h1 className={`${styles.payment__title} h3`}>Оформление заказа</h1>
                        <ul className={styles.productList}>
                            {
                                products.map((element, index) => {
                                    return (
                                        <li key={index} className={styles.productList__item}>
                                            <div className={styles.productList__imageWrapper}>
                                                <img 
                                                    className={styles.productList__image}
                                                    src={element.icon}
                                                    alt=''
                                                    loading='lazy' 
                                                    draggable='false'
                                                />
                                            </div>
                                            <div className={styles.productList__body}>
                                                <h2 className='h5'>{element.title}</h2>
                                                <p className={`${styles.productList__subtitle} gray-text`}>{element.subtitle}</p>
                                                <h3 className='h4'>{element.price}&nbsp;₽</h3>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <form 
                            onSubmit={handleSubmit} 
                            className={styles.form}
                        >
                            <h3 className={`${styles.form__result} h4`}>
                                Итого к оплате: {products.reduce((acc, current) => acc + current.price, 0)}&nbsp;₽
                            </h3>
                            <label className={styles.form__checkbox} htmlFor='agree'>
                                <input 
                                    className={styles.form__checkboxInput}
                                    type='checkbox' 
                                    id='agree'
                                    name='agree'
                                    title=''
                                    onInvalid={handleCheckboxInvalid}
                                    onChange={e => {
                                        setCheckboxStyle(styles.form__checkboxIcon)
                                        setCheckboxValue(e.target.checked)
                                        setError('')
                                    }}
                                    required
                                />
                                <span className={checkboxStyle}></span>
                                <span className={styles.form__checkboxLabel}>
                                    Я согласен с <Link to='/legal/privacy-policy' className={styles.link}>Политикой конфиденциальности</Link> и <Link className={styles.link}>Публичной офертой</Link>
                                </span>
                            </label>
                            {
                                error &&
                                <p className={styles.error}>{error}</p>
                            }
                            <Button
                                type='submit'
                                color='accent'
                                disabled={disabled}
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
}

export default Payment