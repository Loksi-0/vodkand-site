import styles from './HeaderLoader.module.scss'

import cx from 'clsx'

import { useRouteLoading } from '../LoaderProvider'

const TopLoader = () => {
  const { loading } = useRouteLoading()

  return <div className={cx(styles.topLoader, { [styles.active]: loading })} />
}

export default TopLoader
