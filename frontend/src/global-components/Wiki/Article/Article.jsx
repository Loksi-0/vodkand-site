import { WikiContext } from '@/context/WikiContext/wikiContext'
import styles from './Article.module.scss'

import cx from 'clsx'
import { useContext } from 'react'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const Article = () => {
  const { article, isLoading, modifyLink, modifiedContent } =
    useContext(WikiContext)

  return (
    <article className={cx(styles.article, { [styles.isLoading]: isLoading })}>
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
            <h2 className={`${styles.title} ${isLoading && styles.isLoading}`}>
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
  )
}

export default Article
