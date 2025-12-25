import styles from './Wiki.module.scss'

import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router"
import ReactMarkdown from 'react-markdown'
import usePageMetadata from '@/usePageMetadata'
import rehypeRaw from 'rehype-raw'
import './markdown.scss'
import LoadingLink from '../TopLoader/hooks/LoadingLink'
import { useRouteLoading } from '../TopLoader/LoaderProvider'

const Wiki = (props) => {
    const { chapter, firstPage } = props
    const { page } = useParams()
    const { stopLoading } = useRouteLoading()
    const navigate = useNavigate()

    const navRef = useRef(null)
    const location = useLocation()

    const navSkeletonCount = 4

    const navWidths = useMemo(
        () =>
            Array.from({ length: navSkeletonCount }, () =>
            Math.floor(Math.random() * (200 - 90) + 90)
            ),
        []
    )

    const [article, setArticle] = useState({ icon: 'loading', title: null, description: null })
    const [navigation, setNavigation] = useState(Array.from({ length: navSkeletonCount }, () => { return {} }))
    const [isLoading, setIsLoading] = useState(true)

    const controller = new AbortController()

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/wiki/${chapter}/${page}`, { signal: controller.signal })

                if (!response.ok) {
                    if (
                        response.status === 404
                        && location.pathname !== `/${chapter}/${firstPage}`
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
            } catch(e) {
                if (e.name === 'AbortError') return

                setArticle({ title: e.message })
                setIsLoading(false)
                stopLoading()
            }
        }

        const getNavigation = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/wiki/${chapter}`)
            
                if (!response.ok) {
                    const error = await response.json()
                    throw new Error(error.message)
                }

                const data = await response.json()

                setNavigation(data)
                setIsLoading(false)
            } catch(e) {
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
        if (!href) return children

        return <Link to={href}>{children}</Link>
    }

    usePageMetadata({
        title: article.title ? `${definePageName(chapter)} | ${article.title}` : definePageName(chapter),
        ogTitle: article.title,
        ogDescription: article.description,
        ogImage: article.icon
    })

    return (
        <section className={`${styles.wiki} container-big`}>
            <h1 className='visually-hidden'>{definePageName(chapter)}</h1>
            <nav className={styles.navigation}>
                <ul 
                    className={styles.navigationList}
                    ref={navRef}
                >
                    {navigation.map((element, index) => {
                        const isCurrent = element.page === page

                        return (
                            <li 
                                key={index} 
                                className={`${styles.navigationList__item} ${isLoading && styles.isLoading}`}
                                style={isLoading ? { width: navWidths[index] } : undefined}
                            >
                                <LoadingLink 
                                    to={element?.page ? `/${chapter}/${element.page}` : `/${chapter}`} 
                                    className={`${styles.navigationList__link} ${isCurrent && styles.isCurrent}`}
                                >
                                    {
                                        element?.icon && 
                                        <img 
                                            className={styles.navigationList__icon}
                                            src={element.icon}
                                            alt=''
                                            loading='lazy'
                                            draggable='false'
                                        />
                                    }
                                    <div className={styles.navigationList__title} lang='ru'>
                                        {element?.title}
                                    </div>
                                </LoadingLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <article className={`${styles.article} ${isLoading && styles.isLoading}`}>
                <header className={styles.articleHeader}>
                    <div className={styles.articleHeader__inner}>
                        {
                            article.icon === 'loading'
                            ? <div className={`${styles.articleHeader__iconSkeleton}`}></div>
                            : article.icon && <img 
                                className={styles.articleHeader__icon}
                                src={article.icon}
                                alt=''
                                loading='lazy'
                                draggable='false'
                            />
                        }
                        {
                            article.link 
                            ? <a 
                                className={styles.articleHeader__titleLink}
                                href={article.link} 
                                target='_blank' 
                                title={article.link}
                            >
                                <h2 lang='ru' className={`${styles.articleHeader__title} ${isLoading && styles.isLoading}`}>
                                    {article.title}
                                </h2>
                            </a>
                            : <h2 className={`${styles.articleHeader__title} ${isLoading && styles.isLoading}`}>
                                {article.title}
                            </h2>
                        }
                    </div>
                    {
                        isLoading 
                        ? <div className={styles.articleHeader__descriptionSkeleton}></div>
                        : <p className={styles.articleHeader__description}>
                            {article.description}
                        </p>
                    }
                </header>
                <div className='markdown'>
                    <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            a: modifyLink
                        }}
                    >
                        {article.content}
                    </ReactMarkdown>
                </div>
            </article>
        </section>
    )
}

export default Wiki