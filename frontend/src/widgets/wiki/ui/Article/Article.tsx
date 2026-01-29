import styles from './Article.module.scss'

import { WikiContext } from '@/widgets/wiki/model/wikiContext'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import ArticleSkeleton from './ArticleSkeleton'
import useCustomContext from '@/shared/hooks/useCustomContext'

const Article = () => {
  const { article, isArticleLoading, modifyLink, modifiedContent } =
    useCustomContext(WikiContext)

  if (isArticleLoading || !article) {
    return <ArticleSkeleton />
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          {article.icon && (
            <img
              className={styles.header__icon}
              src={article.icon}
              alt=''
              loading='lazy'
              draggable='false'
            />
          )}
          {article.link ? (
            <a
              className={styles.header__link}
              href={article.link}
              target='_blank'
              title={article.link}
              rel='noreferrer'
            >
              <h2
                lang='ru'
                className={styles.header__title}
              >
                {article.title}
              </h2>
            </a>
          ) : (
            <h2 className={styles.header__title}>{article.title}</h2>
          )}
        </div>
        <p className={styles.header__description}>{article.description}</p>
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
