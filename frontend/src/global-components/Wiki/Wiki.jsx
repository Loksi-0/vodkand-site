import styles from './Wiki.module.scss'

import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router"
import ReactMarkdown from 'react-markdown'
import usePageMetadata from '@/usePageMetadata'
import rehypeRaw from 'rehype-raw'
import './markdown.scss'

const Tabs = (props) => {
    const { chapter, firstPage } = props
    const { page } = useParams()

    const navRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    const [article, setArticle] = useState({ title: 'Загрузка...' })
    const [navigation, setNavigation] = useState([{ title: 'Загрузка...' }])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/wiki/${chapter}/${page}`)

                if (!response.ok) {
                    if (
                        response.status === 404
                        && location.pathname !== `/${chapter}/${firstPage}`
                    ) {
                        navigation(`/${chapter}/${firstPage}`)
                        return
                    }
 
                    const error = await response.json()
                    throw new Error(error.message)
                }

                const data = await response.json()

                setArticle(data)
                setIsLoading(false)
            } catch(e) {
                setArticle({ title: e.message })
                setIsLoading(false)
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
    }, [page])

    const handleScroll = () => {
        const element = navRef.current
        sessionStorage.setItem('wikiNavScroll', element.scrollLeft)
    }

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

    usePageMetadata({
        title: `${definePageName(chapter)} | ${article.title}`,
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
                    onScroll={handleScroll}
                >
                    {navigation.map((element, index) => {
                        const isCurrent = element.page === page

                        return (
                            <li 
                                key={index} 
                                className={`${styles.navigationList__item}`}
                            >
                                <Link 
                                    to={`/${chapter}/${element.page}`} 
                                    className={`${styles.navigationList__link} ${isCurrent && styles.isCurrent}`}
                                >
                                    {element.icon && 
                                    <img 
                                        className={styles.navigationList__icon}
                                        src={element.icon}
                                        alt=''
                                        loading='lazy'
                                        draggable='false'
                                    />}
                                    <div className={styles.navigationList__title} lang='ru'>
                                        {element.title}
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <article className={`${styles.article} ${isLoading && styles.isLoading}`}>
                <header className={styles.articleHeader}>
                    <div className={styles.articleHeader__inner}>
                        {article.icon && 
                        <img 
                            className={styles.articleHeader__icon}
                            src={article.icon}
                            alt=''
                            loading='lazy'
                            draggable='false'
                        />
                        }
                        <h2 className={styles.articleHeader__title}>{article.title}</h2>
                    </div>
                    {article.description && <p className={styles.articleHeader__description}>{article.description}</p>}
                </header>
                <div className='markdown'>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {article.content}
                    </ReactMarkdown>
                </div>
            </article>
        </section>
    )
}

export default Tabs