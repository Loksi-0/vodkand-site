import styles from './Tabs.module.scss'

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import DOMPurify from 'dompurify'

const Tabs = (props) => {
    const { page } = props

    const url = `http://127.0.0.1:5000/api/`

    const [article, setArticle] = useState('Loading...')
    const [navigation, setNavigation] = useState(['Loading...'])

    const [searchParams] = useSearchParams()
    const tab = Number(searchParams.get('tab')) || 1

    useEffect(() => {
        fetch(`${url}${page}?tab=${tab}`, {
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
                setArticle(e.message)
            })
    }, [tab]) // fetching article

    useEffect(() => {
        fetch(`${url}${page}?navigation=true`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить навигацию')
                }

                return response.json()
            })
            .then(json => {
                setNavigation(json)
            })
            .catch(e => {
                setNavigation([e.message])
            })
    }, []) // fetching navigation

    const createSafeHTML = (html) => {
        return { __html: DOMPurify.sanitize(html) }
    }

    return (
        <section className={`${styles.tabs} container-big`}>
            <h1 className='visually-hidden'>Плагины</h1>
            <nav className={styles.navigation}>
                <ul className={styles.navigationList}>
                    {navigation.map((element, index) => {
                        const isCurrent = tab === index + 1

                        return (
                            <li key={index} className={`${styles.navigationList__item}`}>
                                <a 
                                    href={`/plugins?tab=${index + 1}`} 
                                    className={`${styles.navigationList__link} ${isCurrent && styles.isCurrent}`}
                                >
                                    {element.icon && 
                                    <img 
                                        className={styles.navigationList__icon}
                                        src={element.icon}
                                        alt=""
                                        loading="lazy"
                                    />}
                                    <div className={styles.navigationList__title}>
                                        {element.title}
                                    </div>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className={styles.article}>
                {page === 'plugins' && 
                    <header className={styles.articleHeader}>
                        <div className={styles.articleHeader__inner}>
                            <img 
                                className={styles.articleHeader__icon}
                                src={article.icon}
                                alt=""
                                loading="lazy"
                            />
                            <h2 className={styles.articleHeader__title}>{article.title}</h2>
                        </div>
                        <p className={styles.articleHeader__description}>{article.description}</p>
                    </header>
                }
                <div 
                    className={styles.articleContent}
                    dangerouslySetInnerHTML={createSafeHTML(article.content)}
                ></div>
            </div>
        </section>
    )
}

export default Tabs