import styles from './Payment.module.scss'

import cx from 'clsx'

import Button from '@/shared/ui/Button'

import { observer } from 'mobx-react-lite'
import { Link } from 'react-router'
import usePayment from '../model/usePayment'
import FormPageLayout from '@/app/layouts/FormPageLayout'
import { ListSkeleton } from '@/features/payment-page'
import Skeleton from '@/shared/ui/Skeleton'

const Payment = observer(() => {
  const {
    setCheckboxValue,
    error,
    setError,
    isLoading,
    isProductLoading,
    disabled,
    handleSubmit,
    product
  } = usePayment()

  return (
    <FormPageLayout>
      <div className={styles.payment__inner}>
        <h1 className={cx(styles.payment__title, 'h3')}>Оформление заказа</h1>
        <ul className={cx(styles.payment__list, styles.list)}>
          {isProductLoading ? (
            <ListSkeleton />
          ) : (
            <li className={styles.list__item}>
              <div className={styles.list__imageWrapper}>
                <img
                  className={styles.image}
                  src={product?.image}
                  alt=''
                  loading='lazy'
                  draggable='false'
                />
              </div>
              <div className={styles.list__body}>
                <h2 className='h5'>{product?.description}</h2>
                <p className={cx(styles.list__subtitle, 'gray')}>
                  {product?.disclaimer}
                </p>
                <h3 className='h4'>{product?.value.split('.')[0]}&nbsp;₽</h3>
              </div>
            </li>
          )}
        </ul>
        <form
          noValidate
          onSubmit={handleSubmit}
          className={cx(styles.payment__form, styles.form)}
        >
          <h3 className={cx(styles.form__result, 'h4')}>
            Итого к оплате:{' '}
            {isProductLoading ? (
              <Skeleton className={styles.form__resultSkeleton} />
            ) : (
              <span>{product?.value.split('.')[0]}&nbsp;₽</span>
            )}
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
              onChange={(e) => {
                setCheckboxValue(e.target.checked)
                setError('')
              }}
            />
            <span
              className={cx(styles.form__icon, { [styles.invalid]: error })}
            ></span>
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
            loading={isLoading}
          >
            Перейти к оплате
          </Button>
        </form>
      </div>
    </FormPageLayout>
  )
})

export default Payment
