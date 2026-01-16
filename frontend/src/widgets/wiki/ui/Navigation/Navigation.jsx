import { useContext } from 'react'
import styles from './Navigation.module.scss'

import cx from 'clsx'

import { WikiContext } from '@/widgets/wiki/model/wikiContext'
import LoadingLink from '@/features/set-top-loader/hooks/LoadingLink'
import NavigationSkeleton from './NavigationSkeleton'

const Navigation = () => {
  const {
    listRef,
    currentRef,
    isNavigationLoading,
    page,
    chapter,
    navigation
  } = useContext(WikiContext)

  if (isNavigationLoading) {
    return <NavigationSkeleton />
  }

  return (
    <nav className={styles.navigation}>
      <ul
        ref={listRef}
        className={styles.list}
      >
        {navigation.map((element, index) => {
          const isCurrent = element.page === page

          return (
            <li
              ref={isCurrent ? currentRef : null}
              key={index}
              className={styles.list__item}
            >
              <LoadingLink
                to={
                  element?.page ? `/${chapter}/${element.page}` : `/${chapter}`
                }
                className={cx(styles.list__link, {
                  [styles.isCurrent]: isCurrent
                })}
              >
                {element?.icon && (
                  <img
                    className={styles.list__icon}
                    src={element.icon}
                    alt=''
                    loading='lazy'
                    draggable='false'
                  />
                )}
                <div
                  className={styles.list__title}
                  lang='ru'
                >
                  {element?.title}
                </div>
              </LoadingLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
