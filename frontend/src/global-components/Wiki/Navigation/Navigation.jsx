import { useContext } from 'react'
import styles from './Navigation.module.scss'

import cx from 'clsx'

import { WikiContext } from '@/context/WikiContext/wikiContext'
import LoadingLink from '@/global-components/TopLoader/hooks/LoadingLink'

const Navigation = () => {
  const {
    listRef,
    currentRef,
    isLoading,
    navWidths,
    page,
    chapter,
    navigation
  } = useContext(WikiContext)

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
              className={cx(styles.item, {
                [styles.isLoading]: isLoading
              })}
              style={isLoading ? { width: navWidths[index] } : undefined}
            >
              <LoadingLink
                to={
                  element?.page ? `/${chapter}/${element.page}` : `/${chapter}`
                }
                className={cx(styles.link, {
                  [styles.isCurrent]: isCurrent
                })}
              >
                {element?.icon && (
                  <img
                    className={styles.icon}
                    src={element.icon}
                    alt=''
                    loading='lazy'
                    draggable='false'
                  />
                )}
                <div
                  className={styles.title}
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
