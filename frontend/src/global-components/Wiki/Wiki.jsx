import styles from './Wiki.module.scss'

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router"
import DOMPurify from 'dompurify'

const Tabs = (props) => {
    const { page } = props

    const url = import.meta.env.VITE_API_URL

    const navRef = useRef(null)

    const [article, setArticle] = useState({ title: 'Загрузка...' })
    const [navigation, setNavigation] = useState([{ title: 'Загрузка...' }])

    const [searchParams] = useSearchParams()
    const tab = Number(searchParams.get('tab')) || 1

    useEffect(() => {
        fetch(`${url}/${page}?tab=${tab}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status === 404 
                        ? 'Страница не найдена' 
                        : response.status
                    )
                }

                return response.json()
            })
            .then(json => {
                setArticle(json)
            })
            .catch(e => {
                setArticle({ title: e.message })
            })
    }, [tab]) // fetching article

    useEffect(() => {
        fetch(`${url}/${page}?navigation=true`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить навигацию. ', response.status)
                }

                return response.json()
            })
            .then(json => {
                setNavigation(json)
            })
            .catch(e => {
                setNavigation([{ title: `Не удалось загрузить навигацию. ${e.message}` }])
            })
    }, []) // fetching navigation

    useEffect(() => {
        const element = navRef.current
        const scroll = sessionStorage.getItem('wikiNavScroll') ?? 0

        if (tab === 1) {
            element.scrollLeft = 0
            return
        }
        
        element.scrollLeft = scroll
    }, [navigation])

    const handleScroll = () => {
        const element = navRef.current
        sessionStorage.setItem('wikiNavScroll', element.scrollLeft)
    }

    const createSafeHTML = (html) => {
        return { __html: DOMPurify.sanitize(html) }
    }

    return (
        <section className={`${styles.wiki} container-big`}>
            <h1 className='visually-hidden'>{page}</h1>
            <nav className={styles.navigation}>
                <ul 
                    className={styles.navigationList}
                    ref={navRef}
                    onScroll={handleScroll}
                >
                    {navigation.map((element, index) => {
                        const isCurrent = tab === index + 1

                        return (
                            <li 
                                key={index} 
                                className={`${styles.navigationList__item}`}
                            >
                                <a 
                                    href={`/${page}?tab=${index + 1}`} 
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
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <article className={styles.article}>
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
                <div 
                    className={`${styles.articleContent} ${article.title === 'Brewery' && styles.squareImage}`}
                    dangerouslySetInnerHTML={createSafeHTML(article.content)}
                >

                </div>
            </article>
        </section>
    )
}

export default Tabs