import styles from './Wiki.module.scss'

import cx from 'clsx'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import ReactMarkdown from 'react-markdown'
import usePageMetadata from '@/hooks/usePageMetadata'
import rehypeRaw from 'rehype-raw'
import './markdown.scss'
import LoadingLink from '../TopLoader/hooks/LoadingLink'
import { useRouteLoading } from '../TopLoader/LoaderProvider'

const Wiki = (props) => {
  const { chapter, firstPage } = props
  const { page } = useParams()
  const { stopLoading } = useRouteLoading()
  const navigate = useNavigate()

  const location = useLocation()

  const listRef = useRef(null)
  const currentRef = useRef(null)

  const navSkeletonCount = 4

  const navWidths = useMemo(
    () =>
      Array.from({ length: navSkeletonCount }, () =>
        Math.floor(Math.random() * (200 - 90) + 90)
      ),
    []
  )

  const [article, setArticle] = useState({
    icon: 'loading',
    title: null,
    description: null
  })
  const [navigation, setNavigation] = useState(
    Array.from({ length: navSkeletonCount }, () => {
      return {}
    })
  )
  const [isLoading, setIsLoading] = useState(true)

  const controller = new AbortController()

  useLayoutEffect(() => {
    if (!listRef.current || !currentRef.current) {
      return
    }

    const current = currentRef.current
    const list = listRef.current

    const offset =
      current.offsetLeft - list.clientWidth / 2 + current.clientWidth / 2

    list.scrollTo({ left: offset })
  }, [isLoading])

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/wiki/${chapter}/${page}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          if (
            response.status === 404 &&
            location.pathname !== `/${chapter}/${firstPage}`
          ) {
            navigate(`/${chapter}/${firstPage}`)
            return
          }

          const error = await response.json()
          throw new Error(error.message)
        }

        const data = await response.json()

        setArticle(data)
        setIsLoading(false)
        stopLoading()
      } catch (e) {
        if (e.name === 'AbortError') {
          return
        }

        setArticle({ title: e.message })
        setIsLoading(false)
        stopLoading()
      }
    }

    const getNavigation = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/wiki/${chapter}`
        )

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message)
        }

        const data = await response.json()

        setNavigation(data)
        setIsLoading(false)
      } catch (e) {
        setNavigation([{ title: e.message }])
        setIsLoading(false)
      }
    }

    getArticle()
    getNavigation()

    return () => controller.abort()
  }, [page])

  const definePageName = (name) => {
    switch (name) {
      case 'plugins':
        return 'Плагины'
      case 'rules':
        return 'Правила'
      case 'legal':
        return 'Правовые сведения'
    }
  }

  const modifyLink = ({ href, children }) => {
    if (!href) {
      return children
    }

    return (
      <Link
        className='link'
        to={href}
      >
        {children}
      </Link>
    )
  }

  const modifiedContent = useMemo(() => {
    if (!article?.content) {
      return ''
    }

    return article.content.replace('{{currentYear}}', new Date().getFullYear())
  }, [article?.content])

  usePageMetadata({
    title: article.title
      ? `${definePageName(chapter)} | ${article.title}`
      : definePageName(chapter),
    ogTitle: article.title,
    ogDescription: article.description,
    ogImage: article.icon
  })

  return (
    <section className={cx(styles.wiki, 'container-big')}>
      <h1 className='visually-hidden'>{definePageName(chapter)}</h1>
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
                    element?.page
                      ? `/${chapter}/${element.page}`
                      : `/${chapter}`
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
      <article
        className={cx(styles.article, { [styles.isLoading]: isLoading })}
      >
        <header className={styles.header}>
          <div className={styles.inner}>
            {article.icon === 'loading' ? (
              <div className={styles.iconSkeleton}></div>
            ) : (
              article.icon && (
                <img
                  className={styles.icon}
                  src={article.icon}
                  alt=''
                  loading='lazy'
                  draggable='false'
                />
              )
            )}
            {article.link ? (
              <a
                className={styles.link}
                href={article.link}
                target='_blank'
                title={article.link}
                rel='noreferrer'
              >
                <h2
                  lang='ru'
                  className={`${styles.title} ${isLoading && styles.isLoading}`}
                >
                  {article.title}
                </h2>
              </a>
            ) : (
              <h2
                className={`${styles.title} ${isLoading && styles.isLoading}`}
              >
                {article.title}
              </h2>
            )}
          </div>
          {isLoading ? (
            <div className={styles.descriptionSkeleton}></div>
          ) : (
            <p className={styles.description}>{article.description}</p>
          )}
        </header>
        <div className='markdown'>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              a: modifyLink
            }}
          >
            {modifiedContent}
          </ReactMarkdown>
        </div>
      </article>
    </section>
  )
}

export default Wiki
