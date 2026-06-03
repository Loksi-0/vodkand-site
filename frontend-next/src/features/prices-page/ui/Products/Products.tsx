import styles from './Products.module.scss'

import cx from 'clsx'

import getProducts from '../../model/getProducts'
import OrderButton from '@/shared/ui/OrderButton'
import ProductsSkeleton from '@/features/prices-page/ui/Products/ProductsSkeleton'
import Image from 'next/image'

const Products = async () => {
  const products = await getProducts()

  if (products === 'error') {
    return (
      <section className={styles.list}>
        <ul className={cx(styles.list__inner, 'container')}>
          <ProductsSkeleton />
        </ul>
      </section>
    )
  }

  return (
    <section className={styles.list}>
      <ul className={cx(styles.list__inner, 'container')}>
        {products.map((product, index) => {
          return (
            <li
              className={styles.list__item}
              key={index}
            >
              <div className={cx(styles.list__imageWrapper)}>
                <Image
                  src={product.image}
                  alt=''
                  loading='lazy'
                  draggable='false'
                  width={200}
                  height={200}
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
                <OrderButton product={products[index].name}>
                  {product.buttonText}
                </OrderButton>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Products
