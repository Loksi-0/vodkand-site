import styles from './Payment.module.scss'

import pass from '@/assets/images/frog.png'
import Button from '@/global-components/Button/Button'

import Header from '@/global-components/Header/Header'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

const Payment = () => {
    const { store } = useContext(Context)

    const { status } = useParams()

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
            await store.agreeTerms(formData)

            const response = await store.createOrder('pass')

            navigate(response.data?.confirmation?.confirmation_url)
            setLoading(false)
        } catch(e) {
            setError(e.response?.data?.message)
        }
    }

    if (status === 'created') {
        if (store.user?.hasPass) {
            navigate('/account', { replace: true })
        }

        return (
            <>
                <Header />
                <main className={styles.created}>
                    <section className={styles.created__inner}>
                        <div className={styles.created__icon}>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className={styles.created__body}>
                            <h1 className='h2'>Успешно</h1>
                            <p className={styles.created__description}>Заказ создан и будет выполнен в ближайшее время</p>
                        </div>
                        <Button 
                            color='accent'
                            className={styles.created__button}
                            onClick={() => navigate('/account',{ replace: true })}
                        >
                            Перейти в аккаунт
                        </Button>
                        </section>
                </main>
            </>
        )
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
}

export default observer(Payment)