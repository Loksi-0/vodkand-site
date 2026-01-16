import styles from './HeaderLoader.module.scss'

import cx from 'clsx'

import { useRouteLoading } from '../LoaderProvider'

const TopLoader = () => {
  const { isLoading } = useRouteLoading()

  return (
    <div className={cx(styles.topLoader, { [styles.active]: isLoading })} />
  )
}

export default TopLoader
