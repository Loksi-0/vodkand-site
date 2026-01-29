import styles from './HeaderLoader.module.scss'

import cx from 'clsx'

import { LoaderContext } from '../context/LoaderContext'
import useCustomContext from '@/shared/hooks/useCustomContext'

const TopLoader = () => {
  const { isLoading } = useCustomContext(LoaderContext)

  return (
    <div className={cx(styles.topLoader, { [styles.active]: isLoading })} />
  )
}

export default TopLoader
