import styles from './HeaderLoader.module.scss'

import { useRouteLoading } from "../LoaderProvider"

const TopLoader = () => {
  const { loading } = useRouteLoading()

  return <div className={`${styles.topLoader} ${loading && styles.active}`}/>
}

export default TopLoader