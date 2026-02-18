import styles from './Wiki.module.scss'

import cx from 'clsx'

import Navigation from './Navigation'
import Article from './Article'
import { WikiContext } from '../model/wikiContext'

import './markdown.scss'
import useCustomContext from '@/shared/hooks/useCustomContext'

const Wiki = () => {
  const { definePageName, chapter, article } = useCustomContext(WikiContext)

  // usePageMetadata({
  //   title: article?.title
  //     ? `${String(definePageName(chapter))} | ${article.title}`
  //     : definePageName(chapter),
  //   ogTitle: article?.title,
  //   ogDescription: article?.description,
  //   ogImage: article?.icon
  // })

  return (
    <section className={cx(styles.wiki, 'container-big')}>
      <h1 className='visually-hidden'>{definePageName(chapter)}</h1>
      <Navigation />
      <Article />
    </section>
  )
}

export default Wiki
