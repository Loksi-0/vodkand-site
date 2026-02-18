'use client'

import styles from './Products.module.scss'

import cx from 'clsx'

import Button from '@/shared/ui/Button'
import { observer } from 'mobx-react-lite'

import useProducts from '../../model/useProducts'
import ProductsSkeleton from './ProductsSkeleton'

const Products = observer(() => {
  const { products, isLoading, onClick } = useProducts()

  return (
    <section className={styles.list}>
      <ul className={cx(styles.list__inner, 'container')}>
        {products.map((product, index) => {
          if (isLoading) {
            return <ProductsSkeleton key={index} />
          }

          return (
            <li
              className={styles.list__item}
              key={index}
            >
              <div className={cx(styles.list__imageWrapper)}>
                <img
                  src={product.image}
                  alt=''
                  loading='lazy'
                  draggable='false'
                />
              </div>
              <div className={styles.list__body}>
                <div className={styles.list__content}>
                  <h2 className={cx(styles.list__title, 'h3')}>
                    {product.title}
                  </h2>
                  <div className={cx(styles.list__price)}>
                    <h3 className='h2'>{product.value.split('.')[0]}&nbsp;₽</h3>
                    {product.valueOld && (
                      <p className={styles.list__sale}>
                        {product.valueOld.split('.')[0]}&nbsp;₽
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  color='accent'
                  disabled={isLoading}
                  onClick={() => {
                    onClick(products[index])
                  }}
                >
                  {product.buttonText}
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
})

export default Products
