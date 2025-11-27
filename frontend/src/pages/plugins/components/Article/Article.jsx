import styles from './Article.module.scss'

import ArticleElement from '../ArticleElement/ArticleElement'

const Article = (props) => {
    const { pluginsList } = props

    return (
        <section className='container'>
            <nav className={styles.navbar}>
                <ul className={styles.navbar__list}>
                    {pluginsList.map((element, index) => {
                        return (
                            <li className={styles.navbar__item} key={index}>
                                <button type='button' className={styles.navbar__button}>
                                    <img 
                                        className={styles.navbar__icon}
                                        src={element.icon} 
                                        alt="" 
                                    />
                                    <p className={styles.navbar__title}>{element.title}</p>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <ul className={styles.articles}>
                {pluginsList.map((element, index) => {
                    return (
                        <li className={styles.articles__item} key={index}>
                            {element.isCurrent && <ArticleElement />}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Article